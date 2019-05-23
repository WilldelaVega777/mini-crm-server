//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import { Customer }         from '../../mongo/customer.model';
import { CustomerTypes }    from '../../mongo/enums/customer-types.enum';
import { CustomerService }  from '../../../services/customer.service';

//---------------------------------------------------------------------
// Resolvers Section
//---------------------------------------------------------------------
export const resolvers = {
    //-----------------------------------------------------------------
    // Query Resolvers:
    //-----------------------------------------------------------------
    Query: {
        customers: (root: any, {limit}) => {
            return CustomerService.getInstance().getCustomers(limit);
        },
        getCustomer: (root: any, {id}) =>
        {
            return CustomerService.getInstance().getCustomerById(id);
        }
    },
    //-----------------------------------------------------------------
    Mutation: {
        createCustomer: (root: any, {input}) =>
        {
            return CustomerService.getInstance().createCustomer(input);
        },
        updateCustomer: (root: any, {input}) =>
        {
            return CustomerService.getInstance().updateCustomer(input);
        },
        removeCustomer: (root: any, {input}) =>
        {
            return CustomerService.getInstance().removeCustomer(input);
        }
    }
};

