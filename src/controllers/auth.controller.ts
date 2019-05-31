//--------------------------------------------------------------------------------------------------
// Imports Section (Node Libraries):
//--------------------------------------------------------------------------------------------------
import * as express from 'express';
//--------------------------------------------------------------------------------------------------
// Imports Section (Services):
//--------------------------------------------------------------------------------------------------
import { AuthService }      from '../services/auth.service';
import { UserService }      from '../services/user.service';
//--------------------------------------------------------------------------------------------------
// Imports Section (Schemas):
//--------------------------------------------------------------------------------------------------
import { User }             from '../models/mongo/express-schemas/user.schema';

//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppControllers
{
    //----------------------------------------------------------------------------------------------
    // Route Controllers Section
    //----------------------------------------------------------------------------------------------
    export class AuthController
    {
        //------------------------------------------------------------------------------------------
        // Public UI Section
        //------------------------------------------------------------------------------------------
        public showLogin(req: express.Request, res: express.Response, next: express.NextFunction)
        {
            res.render('pages/login/index', { 'PageTitle': 'Acceso al Sistema' });
        }

        //------------------------------------------------------------------------------------------
        // Public WebMethods Section
        //------------------------------------------------------------------------------------------
        public authenticatedAction(req: express.Request, res: express.Response, next: express.NextFunction)
        {
            res.redirect('/home');
        }

        //------------------------------------------------------------------------------------------
        public authenticateAction(req: express.Request, username: string, password: string, done: any)
        {
            // Proceed to Data Transaction...
            let authService: AuthService = new AuthService();

            // Debug:
            authService.createTestCredential();

            // Perform Authentication
            authService.signIn(username, password)
                .then((authData: User) => {
                    if (!authData)
                    {
                        console.log('Error autenticando usuario.');
                        done(null, false);
                        return;
                    }
                    return done(
                        null,
                        {
                            'name'      : authData.name,
                            'role'      : authData.role
                        }
                    );
                })
                .catch((error: any) =>
                {
                    console.log(error);
                    return done(error);
                });
        }

        //------------------------------------------------------------------------------------------
        public postAuthenticate(req: express.Request, res: express.Response, next: express.NextFunction)
        {
            console.log('postAuthenticate');
        }

        //------------------------------------------------------------------------------------------
        public async getUserProfile(userId: string, cb: any)
        {
            let userService: UserService = new UserService();

            const user: User = await userService.findUserById(userId);

            if (user)
            {
                return cb(null, { 'id': userId, 'name': user.name, 'role': user.role });
            }
        }
    }
}

//--------------------------------------------------------------------------------------------------
// Export Module Section
//--------------------------------------------------------------------------------------------------
export = AppControllers;
