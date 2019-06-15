//------------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//------------------------------------------------------------------------------
import * as mongoose        from 'mongoose';
import { Typegoose }        from 'typegoose';
import { prop }             from 'typegoose';
import { validations }      from '../../helpers/model-validations.helper';
import { Formats }          from '../../helpers/model-validations.helper';

//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Product extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id: string;

    @validations({ required: true, max: 80, min: 3, regex: Formats.all })
    @prop({ required: true })
    public name: string;

    @validations({ required: true, min: 2, max: 1000000, regex: Formats.price })
    @prop({ required: true })
    public price: number;

    @validations({ required: true, min: 0, max: 10000, regex: Formats.quantity })
    @prop({ required: true })
    public stock: number;

    @validations({ required: true, min: 0, max: 10000, regex: Formats.quantity })
    @prop({ required: true })
    public reorder: number;
}

//--------------------------------------------------------------------------
// Module Exports
//--------------------------------------------------------------------------
export const productModel = new Product().getModelForClass(Product);
