//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express             from "express";
import * as ConnectRoles        from "connect-roles";
import * as login               from "connect-ensure-login";


//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class AuthorizationMiddleware
    {
        //------------------------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------------------------
        public static getInstance(rt: express.Application): AuthorizationMiddleware
        {
            if (AuthorizationMiddleware._instance == null)
            {
                AuthorizationMiddleware._instance = new AuthorizationMiddleware(rt);
            }
            return AuthorizationMiddleware._instance;
        }

        //------------------------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------------------------
        private static _instance: AuthorizationMiddleware;

        //------------------------------------------------------------------------------------------
        // Private Fields Section:
        //------------------------------------------------------------------------------------------
        private app: express.Application;


        //------------------------------------------------------------------------------------------
        // Constructor Method Section
        //------------------------------------------------------------------------------------------
        constructor(ea: express.Application)
        {
            this.app = ea;
        }


        //------------------------------------------------------------------------------------------
        // Public Methods Section
        //------------------------------------------------------------------------------------------
        public configure()
        {
            const config = {
                failureHandler: (req: express.Request, res: express.Response, action: any) =>
                {
                    var accept = req.headers.accept || "";
                    res.status(403);
                    if (~accept.indexOf("html"))
                    {
                        res.render(
                            "pages/errors/access-denied",
                            {
                                action: action,
                                "PageTitle": "No Autorizado!"
                            }
                        );
                    }
                    else
                    {
                        res.send("Acceso Denegado - No tiene permisos para: " + action);
                    }
                }
            };
            let user = new ConnectRoles.ConnectRoles(config);
            this.app.use(user.middleware(config));

            //---------------------------------------------------------------------
            // Roles / Permissions
            //---------------------------------------------------------------------
            user.use("access extranet page",
                (req: express.Request) =>
                {
                    if (req.user.role === "customer")
                    {
                        return true;
                    }
                });

            //---------------------------------------------------------------------
            user.use("access intranet page",
                (req: express.Request) =>
                {
                    if (req.user.role === "manager")
                    {
                        return true;
                    }
                });

            //---------------------------------------------------------------------
            user.use((req: express.Request) =>
            {
                if (req.user.role === "admin")
                {
                    return true;
                }
            });
        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppMiddlewares;
