//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import * as Models              from '../../mongo/models';
import { CustomerService }      from '../../../services/customer.service';
import { ProductService }       from '../../../services/product.service';

//---------------------------------------------------------------------
// Resolvers:
//---------------------------------------------------------------------
export const resolvers = {
    //-----------------------------------------------------------------
    // Query Resolvers (Data):
    //-----------------------------------------------------------------
    Query: {
        //-------------------------------------------------------------
        // Customers
        //-------------------------------------------------------------
        customers: (root: any, {limit, offset}) => {
            return CustomerService.getInstance().getCustomers(limit, offset);
        },
        getCustomers: (root: any, {limit, offset}) => {
              return CustomerService.getInstance().getCustomersPaginated(limit, offset);
        },
        getCustomer: (root: any, {id}) =>
        {
            return CustomerService.getInstance().getCustomerById(id);
        },
        //-------------------------------------------------------------
        // Products
        getProducts: (root: any, { limit, offset }) =>
        {
            return ProductService.getInstance().getProductsPaginated(limit, offset);
        },
        getProduct: (root: any, { id }) =>
        {
            return ProductService.getInstance().getProductById(id);
        }
    },
    //-----------------------------------------------------------------
    // Mutation Resolvers
    //-----------------------------------------------------------------
    Mutation: {
        //-------------------------------------------------------------
        // Customers
        //-------------------------------------------------------------
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
        },
        //-------------------------------------------------------------
        // Products
        //-------------------------------------------------------------
        createProduct: (root: any, { input }) =>
        {
            return ProductService.getInstance().createProduct(input);
        },
        updateProduct: (root: any, { input }) =>
        {
            return ProductService.getInstance().updateProduct(input);
        },
        removeProduct: (root: any, { input }) =>
        {
            return ProductService.getInstance().removeProduct(input);
        }
    }
};
