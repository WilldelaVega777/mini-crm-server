//--------------------------------------------------------------------------------------------------
// Imports Section: (Models)
//--------------------------------------------------------------------------------------------------
import { credentialModel }        from "../models/mongo/express-schemas/credential.schema";
import { userModel }              from "../models/mongo/express-schemas/user.schema";

import { Credential }             from "../models/mongo/express-schemas/credential.schema";
import { User }                   from "../models/mongo/express-schemas/user.schema";

//--------------------------------------------------------------------------------------------------
// Service Class:
//--------------------------------------------------------------------------------------------------
export class AuthService
{
    //----------------------------------------------------------------------------------------------
    // Constructor Method Section:
    //----------------------------------------------------------------------------------------------
    constructor() { }

    //----------------------------------------------------------------------
    // Public Methods Section:
    //----------------------------------------------------------------------
    public signIn(pEmail: String, pPassword: String): Promise<any>
    {
        return new Promise(async (resolve, reject) => {
            try
            {
                const credential = await credentialModel.find(
                    {
                        email: pEmail,
                        password: pPassword
                    }
                );
                resolve(credential);
            }
            catch (error)
            {
                reject(error);
            }
        });
    }
    //----------------------------------------------------------------------
    createTestCredential()
    {
        credentialModel.create({
            user    : "info@willdelavega.com",
            password: "12345"
        })
    }
}
