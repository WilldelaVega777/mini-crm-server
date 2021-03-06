//--------------------------------------------------------------------------
// Imports Section (Libraries)
//--------------------------------------------------------------------------
import { Typegoose }        from 'typegoose';
import { prop }             from 'typegoose';

//--------------------------------------------------------------------------
// Imports Section (App Dependencies)
//--------------------------------------------------------------------------
import { Email }                    from './email.model';
import { Order }                    from './order.model';
import { CustomerTypes }            from './enums/customer-types.enum';
import { validations }              from '../../helpers/model-validations.helper';
import { Formats }                  from '../../helpers/model-validations.helper';


//--------------------------------------------------------------------------
// Class Section
//--------------------------------------------------------------------------
export class Customer extends Typegoose
{
    //----------------------------------------------------------------------
    // Public Fields Section
    //----------------------------------------------------------------------
    @prop({ required: false })
    public id: string;

    @validations({ required: true, max: 40, min: 3, regex: Formats.alpha })
    @prop({ required: false })
    public first_name: string;

    @validations({ required: true, max: 40, min: 3, regex: Formats.alpha })
    @prop({ required: false })
    public last_name: string;

    @validations({ required: true, max: 40, min: 3, regex: Formats.alpha })
    @prop({ required: false })
    public company: string;

    @validations({ required: true, max: 120, min: 18 })
    @prop({ required: false })
    public age: number;

    @validations({ required: true })
    @prop({ required: false })
    public type: CustomerTypes;

    @validations({ required: true, max: 40, min: 8, regex: Formats.email })
    @prop({ required: false })
    public emails: Email[];

    @prop({ required: false })
    public orders: Order[];

    @prop({ required: false })
    public salesman: string;

}

//--------------------------------------------------------------------------
// Module Exports
//--------------------------------------------------------------------------
export const customerModel = new Customer().getModelForClass(Customer);

