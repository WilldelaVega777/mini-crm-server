//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as mongoose from 'mongoose';

//--------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------
import * as Models              from '../models/mongo/models';
import { PaginatedMetadata }    from '../models/mongo/models';
import { Token }                from '../models/ts/token.model';
import { TokenUser }            from '../models/ts/token-user.model';
import { LoggedUser }           from '../models/ts/logged-user.model';

//--------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------
export class UserService
{
    //----------------------------------------------------------------------
    // Singleton Implementation:
    //----------------------------------------------------------------------
    public static getInstance(): UserService
    {
        if (UserService._instance == null)
        {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }
    private static _instance: UserService;


    //----------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------
    private constructor() { }


    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public async authenticate(username: string, password: string): Promise<Token>
    {
        return Models.userModel.authenticate(username, password);
    }
    //----------------------------------------------------------------------
    public async getCurrentLogin(pUser: TokenUser): Promise<LoggedUser>
    {
        return new Promise(async (resolve, reject) => {
            if ((!pUser) || pUser.user === 'null')
            {
                resolve({
                    id          : '',
                    username    : 'null',
                    first_name  : '',
                    last_name   : ''
                } as LoggedUser);
            }

            // Debug
            //console.log(pUser);

            try
            {
                const currentUser: Models.User = await Models.userModel.findOne({
                    username: pUser.user
                });
                resolve(({
                    id          : currentUser['_id'],
                    username    : pUser.user,
                    first_name  : currentUser.first_name,
                    last_name   : currentUser.last_name,
                    role        : currentUser.role
                } as LoggedUser));
            }
            catch (error)
            {
                reject('El usuario no existe en la base de datos');
            }
        });
    }
    //----------------------------------------------------------------------
    public getUsersPaginated(limit: number, offset: number): Promise<Models.UsersPaginated>
    {
        return new Promise((resolve, reject) =>
        {
            Models.userModel.find({}).limit(limit).skip(offset)
                .then((users: Models.User[]) =>
                {
                    const readyUsers: Models.User[] = (users.map(user =>
                    {
                        user.id = user['_id'];
                        return user;
                    }));

                    Models.userModel.countDocuments({}, (error, count) =>
                    {
                        if (error)
                        {
                            reject(error);
                        }
                        else
                        {
                            const usersMetadata: PaginatedMetadata =
                                new Models.PaginatedMetadata(count);

                            resolve(
                                new Models.UsersPaginated(
                                    readyUsers, usersMetadata
                                )
                            );
                        }
                    });
                })
                .catch(error => reject(error));
        });
    }
    //----------------------------------------------------------------------
    public getUserById(id: string): Promise<Models.User>
    {
        return new Promise((resolve, reject) =>
        {
            Models.userModel.findById(
                id,
                (error, user) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve(user);
                    }
                }
            );
        });
    }
    //----------------------------------------------------------------------
    public async createUser(input: Models.User): Promise<Models.User>
    {
        return Models.userModel.addUser(input);
    }
    //----------------------------------------------------------------------
    public updateUser(input: Models.User): Promise<Models.User>
    {
        return Models.userModel.updateUser(input);
    }
    //----------------------------------------------------------------------
    public removeUser(input: string): Promise<string>
    {
        return new Promise((resolve, reject) =>
        {
            Models.userModel.findOneAndRemove(
                { _id: input },
                (error) =>
                {
                    if (error)
                    {
                        reject(error);
                    }
                    else
                    {
                        resolve('Se eliminó el registro!');
                    }
                }
            );
        });
    }
}
