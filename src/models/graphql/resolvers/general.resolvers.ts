//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import { Customer }             from '../../mongo/customer.model';
import { CustomerService }      from '../../../services/customer.service';

//---------------------------------------------------------------------
// Resolvers Section
//---------------------------------------------------------------------
export const resolvers = {
    //-----------------------------------------------------------------
    // Query Resolvers (Data):
    //-----------------------------------------------------------------
    Query: {

        // Data Resolvers:
        customers: (root: any, {limit}) => {
            return CustomerService.getInstance().getCustomers(limit);
        },
        getCustomer: (root: any, {id}) =>
        {
            return CustomerService.getInstance().getCustomerById(id);
        },

        // Validator Resolvers:
        getCustomerValidations: () =>
        {
            // Create Instance to Extract Validators
            const customer = new Customer();

            // Return validators
            return customer['__validators'];
        }
    },
    //-----------------------------------------------------------------
    // Mutation Resolvers
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

