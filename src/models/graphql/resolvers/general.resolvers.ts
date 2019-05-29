//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import * as Models              from '../../mongo/models';
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
