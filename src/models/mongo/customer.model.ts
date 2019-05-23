//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import * as mongoose        from "mongoose";
import { Typegoose }        from "typegoose";
import { prop }             from "typegoose";
import { ModelType }        from "typegoose";
import { InstanceType }     from "typegoose";

//--------------------------------------------------------------------------
// Imports Section
//--------------------------------------------------------------------------
import { Email }            from './email.model';
import { Order }            from './order.model';
import { CustomerTypes }    from './enums/customer-types.enum';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Customer extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id           : string;

    @prop({ required: false })
    public first_name   : string;

    @prop({ required: false })
    public last_name    : string;

    @prop({ required: false })
    public company      : string;

    @prop({ required: false })
    public age          : number;

    @prop({ required: false })
    public type         : CustomerTypes;

    @prop({ required: false })
    public email        : string;

    @prop({ required: false })
    public orders       : Order[];
}
//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const customerModel = new Customer().getModelForClass(Customer);
