//------------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//------------------------------------------------------------------------------
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

    @validations({ required: true, max: 40, min: 3, regex: Formats.alpha })
    @prop({ required: true })
    public name: string;

    @validations({ required: true, regex: Formats.price })
    @prop({ required: true })
    public price: number;

    @validations({ required: true, regex: Formats.quantity })
    @prop({ required: true })
    public stock: number;
}

//--------------------------------------------------------------------------
// Module Exports
//--------------------------------------------------------------------------
export const productModel = new Product().getModelForClass(Product);
