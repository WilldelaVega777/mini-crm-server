//------------------------------------------------------------------------------
// Imports Section (Mongoose / Typegoose)
//------------------------------------------------------------------------------
import { Typegoose } from 'typegoose';
import { prop } from 'typegoose';


//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class TopSeller extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id: string;
    //----------------------------------------------------------------------
    @prop({ required: false })
    public name: string;
    //----------------------------------------------------------------------
    @prop({ required: false })
    public total: number;
}

//--------------------------------------------------------------------------
// Module Exports
//--------------------------------------------------------------------------
export const topSellerModel = new TopSeller().getModelForClass(TopSeller);

