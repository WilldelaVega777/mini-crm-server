//--------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//--------------------------------------------------------------------------
import * as mongoose            from 'mongoose';
import { Typegoose }            from 'typegoose';
import { prop }                 from 'typegoose';
import { OrderItem }            from './order-item.model';
import { OrderStatus }          from './enums/order-status.enum';
import { ObjectId } from 'bson';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Order extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id       : string;

    @prop({ required: true })
    public date     : Date;

    @prop({ required: true })
    public customer: mongoose.Types.ObjectId;

    @prop({ required: true })
    public status: OrderStatus;

    @prop({ required: true })
    public items    : OrderItem[];

    @prop({ required: true })
    public total: number;

}

//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const orderModel = new Order().getModelForClass(Order);
