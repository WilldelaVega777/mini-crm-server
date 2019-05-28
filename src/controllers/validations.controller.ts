//--------------------------------------------------------------------------------------------------
// Imports Section: (Node Libraries)
//--------------------------------------------------------------------------------------------------
import * as express from 'express';
import * as Models  from '../models/mongo/models';


//--------------------------------------------------------------------------------------------------
// Module Section
//--------------------------------------------------------------------------------------------------
module AppControllers
{
    //----------------------------------------------------------------------------------------------
    // Class Section
    //----------------------------------------------------------------------------------------------
    export class ValidationsController
    {

        //------------------------------------------------------------------------------------------
        // Routes Section
        //------------------------------------------------------------------------------------------
        public getValidators(req: express.Request, res: express.Response, next: express.NextFunction)
        {
            const className: string = req.params['for'];
            let instance    = null;
            let validators  = null;

            try
            {
                instance    = Object.create(Models[className].prototype);
                validators  = instance['__validators'];
            }
            catch (error)
            {
                res.send({
                    message: 'El tipo no existe o no se pasó el parámetro correctamente',
                    error: error.message
                });
            }

            //--------------------------------------------------------------------------------
            // WS Response:
            //--------------------------------------------------------------------------------
            res.send(validators);
        }
    }
}

//--------------------------------------------------------------------------------------------------
// Export Module Section
//--------------------------------------------------------------------------------------------------
export = AppControllers;
