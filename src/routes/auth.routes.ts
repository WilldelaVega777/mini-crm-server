//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express             from "express";
import * as passport            from "passport";

//--------------------------------------------------------------------------------------------------
// Controllers:
//--------------------------------------------------------------------------------------------------
import { AuthController }       from "../controllers/auth.controller";


//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppRoutes
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class AuthRoutes
    {
        //---------------------------------------------------------------------
        // Static Methods Section
        //---------------------------------------------------------------------
        public static getInstance(rt: express.Router): AuthRoutes
        {
            if (AuthRoutes._instance != null)
            {
                return AuthRoutes._instance;
            }
            return new AuthRoutes(rt);
        }

        //---------------------------------------------------------------------
        // Static Fields Section
        //---------------------------------------------------------------------
        private static _instance: AuthRoutes;

        //---------------------------------------------------------------------
        // Private Fields Section:
        //---------------------------------------------------------------------
        private router: express.Router;


        //---------------------------------------------------------------------
        // Constructor Method Section
        //---------------------------------------------------------------------
        constructor(rt: express.Router)
        {
            this.router = rt;
        }


        //---------------------------------------------------------------------
        // Public Methods Section
        //---------------------------------------------------------------------
        public defineRoutes()
        {
            // Controller:
            let authController: AuthController =
                new AuthController();

            // Routes:
            this.router.get("/login", authController.showLogin);
            // this.router.get("/login", (req: express.Request, res: express.Response) => {
            //     res.send('auth funciona!');
            // });

            // this.router.post("/login",
            //     passport.authenticate("local", { failureRedirect: "/login" }),
            //     authController.authenticatedAction
            // );
        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppRoutes;
