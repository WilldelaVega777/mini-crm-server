//------------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//------------------------------------------------------------------------------
import { Typegoose }                from 'typegoose';
import { staticMethod }             from 'typegoose';
import { prop }                     from 'typegoose';
import * as Models                  from './models';
import * as bcrypt                  from 'bcrypt';
import { validations }              from '../../helpers/model-validations.helper';
import { Formats }                  from '../../helpers/model-validations.helper';
import { Token }                    from '../ts/token.model';
import * as dotenv                  from 'dotenv';
import * as jwt                     from 'jsonwebtoken';
//--------------------------------------------------------------------------
// Imports Section (App Types)
//--------------------------------------------------------------------------
import { UserRole }                 from './enums/user-role.enum';


//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class User extends Typegoose
{
    //----------------------------------------------------------------------
    // Static Methods Section
    //----------------------------------------------------------------------
    @staticMethod
    public static async addUser(pUser: User) : Promise<User>
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const userExists = await Models.userModel.findOne(
                    { username: pUser.username }
                );
                if (!userExists)
                {
                    const salt = await bcrypt.genSalt(10);
                    const hash = await bcrypt.hash(pUser.password, salt);
                    pUser.password = hash;

                    const newUser = await Models.userModel.create(pUser);
                    newUser.id = newUser._id;
                    resolve(newUser);
                }
                else
                {
                    throw new Error('El usuario ya existe');
                }
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
    //----------------------------------------------------------------------
    @staticMethod
    public static async updateUser(pUser: User): Promise<User>
    {
        return new Promise(async (resolve, reject) =>
        {
            try
            {
                const salt = await bcrypt.genSalt(10);
                const hash = await bcrypt.hash(pUser.password, salt);
                pUser.password = hash;

                Models.userModel.findOneAndUpdate(
                    { _id: pUser.id },
                    pUser,
                    { new: true },
                    (error, updatedUser) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            resolve(updatedUser);
                        }
                    }
                );
            }
            catch (error)
            {
                reject(error);
            }
        });
    }

    //----------------------------------------------------------------------
    @staticMethod
    public static async authenticate(
        pUserName: string,
        pPassword: string)
    : Promise<Token>
    {
        return new Promise(async (resolve, reject) =>
        {
            const user = await Models.userModel.findOne({
                username : pUserName
            });
            if (!user)
            {
                resolve({
                    token: 'null'
                });
            }
            else
            {
                const passed: boolean = await bcrypt.compare(
                    pPassword,
                    user.password
                );
                if (!passed)
                {
                    reject('Contraseña Incorrecta');
                }
                else
                {
                    try
                    {
                        resolve({
                            token: User.createToken(
                                user.username,
                                process.env.SECRET,
                                '1hr'
                            )
                        });
                    }
                    catch (error)
                    {
                        reject(error);
                    }
                }
            }
        });
    }
    //----------------------------------------------------------------------
    @staticMethod
    public static createToken(user: string, secret: string, expiresIn: string): string
    {
        return jwt.sign(
            {user},
            secret,
            {expiresIn: expiresIn}
        );
    }
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id: string;

    @prop({ required: true })
    @validations({ required: true, max: 15, min: 4, regex: Formats.alphanumeric })
    public username: string;

    @prop({ required: true })
    @validations({ required: true, max: 30, min: 3, regex: Formats.alpha })
    public first_name: string;

    @prop({ required: true })
    @validations({ required: true, max: 30, min: 3, regex: Formats.alpha })
    public last_name: string;

    @prop({ required: true })
    @validations({ required: true, max: 15, min: 4, regex: Formats.alphanumeric })
    public password: string;

    @prop({ required: true })
    @validations({ required: true })
    public role: UserRole;

    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    constructor(pUserName?: string | undefined, pPassword?: string | undefined)
    {
        super();

        if (pUserName)
        {
            this.username = pUserName;
        }
        if (pPassword)
        {
            this.password = pPassword;
        }
    }
}

//--------------------------------------------------------------------------
// Const for Model
//--------------------------------------------------------------------------
export const userModel = new User().getModelForClass(User);
