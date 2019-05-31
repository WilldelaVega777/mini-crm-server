//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express             from 'express';
import * as cors                from 'cors';


//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppMiddlewares
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class CORSMiddleware
    {
        //------------------------------------------------------------------------------------------
        // Static Methods Section
        //------------------------------------------------------------------------------------------
        public static getInstance(rt: express.Application): CORSMiddleware
        {
            if (CORSMiddleware._instance == null)
            {
                CORSMiddleware._instance = new CORSMiddleware(rt);
            }
            return CORSMiddleware._instance;
        }

        //------------------------------------------------------------------------------------------
        // Static Fields Section
        //------------------------------------------------------------------------------------------
        private static _instance: CORSMiddleware;

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
            this.app.use(cors());
        }
    }
}
//--------------------------------------------------------------------------------------------------
// Exports Section
//--------------------------------------------------------------------------------------------------
export = AppMiddlewares;