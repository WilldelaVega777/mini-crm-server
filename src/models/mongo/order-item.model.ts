//--------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//--------------------------------------------------------------------------
import * as mongoose            from 'mongoose';
import { Typegoose }            from 'typegoose';
import { prop }                 from 'typegoose';
import { Product }              from './product.model';
import { OrderStatus }          from './enums/order-status.enum';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class OrderItem extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id           : mongoose.Types.ObjectId;

    @prop({ required: true })
    public quantity     : number;

    @prop({ required: true })
    public product      : Product;
}

//-------------------------------------------------------------------------------------------
// Module Exports
//-------------------------------------------------------------------------------------------
export const orderItemModel = new OrderItem().getModelForClass(OrderItem);
