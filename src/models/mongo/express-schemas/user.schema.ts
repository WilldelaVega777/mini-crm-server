//-------------------------------------------------------------------------------------------
// Imports Section (Libraries)
//-------------------------------------------------------------------------------------------
import * as mongoose                from "mongoose";
import { Typegoose }                from "typegoose";
import { prop }                     from "typegoose";
import { ModelType }                from "typegoose";
import { InstanceType }             from "typegoose";


//-------------------------------------------------------------------------------------------
// Schema Definition
//-------------------------------------------------------------------------------------------
export class User extends Typegoose
{
    @prop({ required: true})
    public email    : string;

    @prop({ required: true })
    public name     : string;

    @prop({ required: true })
    public role     : string;

    @prop({ required: true, default: Date.now })
    public created_at: Date;
}
//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const userModel = new User().getModelForClass(User);
