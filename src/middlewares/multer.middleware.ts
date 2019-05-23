//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express             from "express";
import * as multer              from "multer";

//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class MulterMiddleware
    {
        //------------------------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------------------------
        public static getInstance(rt: express.Application): MulterMiddleware
        {
            if (MulterMiddleware._instance == null)
            {
                MulterMiddleware._instance = new MulterMiddleware(rt);
            }
            return MulterMiddleware._instance;
        }

        //------------------------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------------------------
        private static _instance: MulterMiddleware;

        //------------------------------------------------------------------------------------------
        // Private Fields Section:
        //------------------------------------------------------------------------------------------
        private app: express.Application;
        private multer: any;
        private upload: any;

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
            let storage = multer.diskStorage({
                destination: function (req: Express.Request, file: any, cb: any)
                {
                    cb(null, "../uploads");
                },
                filename: function (req: Express.Request, file: any, cb: any)
                {
                    cb(null, file.fieldname + "-" + Date.now());
                }
            });

            this.upload = multer({
                dest: "../uploads/",
                storage: storage
            });

        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppMiddlewares;
