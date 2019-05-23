//--------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//--------------------------------------------------------------------------
import * as mongoose            from "mongoose";
import { Typegoose }            from "typegoose";
import { prop }                 from "typegoose";
import { ModelType }            from "typegoose";
import { InstanceType }         from "typegoose";

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Order extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    public id       : string;
    public product  : string;
    public price    : number;
}

//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const orderModel = new Order().getModelForClass(Order);
