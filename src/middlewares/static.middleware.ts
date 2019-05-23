//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express      from "express";
import * as serveFavicon from "serve-favicon";


//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class StaticContentMiddleware
    {
        //------------------------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------------------------
        public static getInstance(rt: express.Application): StaticContentMiddleware
        {
            if (StaticContentMiddleware._instance == null)
            {
                StaticContentMiddleware._instance = new StaticContentMiddleware(rt);
            }
            return StaticContentMiddleware._instance;
        }

        //------------------------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------------------------
        private static _instance: StaticContentMiddleware;

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
            this.app.use(express.static(__dirname + "../../../app/public"));
            this.app.use(express.static(__dirname + "../../../app/uploads"));
            this.app.use(serveFavicon(__dirname + "../../../app/public/images/favicon.ico"));
            this.app.set("view engine", "ejs");
            this.app.set("views", __dirname + "../../../app/views");
        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppMiddlewares;
