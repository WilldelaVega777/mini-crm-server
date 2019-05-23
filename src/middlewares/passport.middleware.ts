//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express             from "express";
import * as expressSession      from "express-session";
import * as passport            from "passport";
import * as passportLocal       from "passport-local";


import { AuthController }       from "../controllers/auth.controller";

//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class PassportMiddleware
    {
        //------------------------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------------------------
        public static getInstance(rt: express.Application): PassportMiddleware
        {
            if (PassportMiddleware._instance == null)
            {
                PassportMiddleware._instance = new PassportMiddleware(rt);
            }
            return PassportMiddleware._instance;
        }

        //------------------------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------------------------
        private static _instance: PassportMiddleware;

        //------------------------------------------------------------------------------------------
        // Private Fields Section:
        //------------------------------------------------------------------------------------------
        private app             : express.Application;
        private passport        : any;
        private authController  : AuthController;


        //------------------------------------------------------------------------------------------
        // Constructor Method Section
        //------------------------------------------------------------------------------------------
        constructor(ea: express.Application)
        {
            this.app = ea;
            this.passport = passport;
            this.authController = new AuthController(); // new or app???
        }


        //------------------------------------------------------------------------------------------
        // Public Methods Section
        //------------------------------------------------------------------------------------------
        public configure()
        {
            // Session:
            this.app.use(
                expressSession(
                    {
                        secret: "keyboard cat",
                        resave: false,
                        saveUninitialized: false
                    }
                )
            );

            // Serializatiion
            passport.serializeUser((user: any, cb) =>
            {
                cb(null, user.id);
            });

            // Deserialization:
            passport.deserializeUser((id: string, cb) =>
            {
                this.authController.getUserProfile(id, cb);
            });

            // Passport Local Strategy Handler:
            passport.use(new passportLocal.Strategy({
                usernameField: "username",
                passwordField: "password",
                passReqToCallback: true
            },
                (req, username, password, done) =>
                {
                    this.authController.authenticateAction(req, username, password, done);
                }));

            // Initialize Passport and Session:
            this.app.use(passport.initialize());
            this.app.use(passport.session());
        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppMiddlewares;
