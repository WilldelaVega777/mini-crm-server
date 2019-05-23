//--------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//--------------------------------------------------------------------------
import * as mongoose        from "mongoose";
import { Typegoose }        from "typegoose";
import { prop }             from "typegoose";
import { ModelType }        from "typegoose";
import { InstanceType }     from "typegoose";

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Email extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: true })
    public email: string;
}

//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const emailModel = new Email().getModelForClass(Email);
