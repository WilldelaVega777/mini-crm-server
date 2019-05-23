//-------------------------------------------------------------------------------------------
// Imports Section (Libraries)
//-------------------------------------------------------------------------------------------
import * as mongoose            from "mongoose";
import { prop }                 from "typegoose";
import { Typegoose }            from "typegoose";
import { ModelType }            from "typegoose";
import { InstanceType }         from "typegoose";


//-------------------------------------------------------------------------------------------
// Schema Definition
//-------------------------------------------------------------------------------------------
export class Credential extends Typegoose
{
    @prop({ required: true })
    email: string;

    @prop({ required: true })
    password: string;
}
//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const credentialModel = new Credential().getModelForClass(Credential);
