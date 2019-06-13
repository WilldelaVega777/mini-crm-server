//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import * as Models              from '../../mongo/models';
import { CustomerService }      from '../../../services/customer.service';
import { ProductService }       from '../../../services/product.service';
import { OrderService }         from '../../../services/order.service';

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
        //-------------------------------------------------------------
        getProducts: (root: any, { limit, offset, stock }) =>
        {
            return ProductService.getInstance().getProductsPaginated(limit, offset, stock);
        },
        getProduct: (root: any, { id }) =>
        {
            return ProductService.getInstance().getProductById(id);
        },
        //-------------------------------------------------------------
        // Orders
        //-------------------------------------------------------------
        getOrders: (root: any, { limit, offset }) =>
        {
            return OrderService.getInstance().getOrdersPaginated(limit, offset);
        },
        getOrder: (root: any, { id }) =>
        {
            return OrderService.getInstance().getOrderById(id);
        },
        getOrdersByCustomer(root: any, { limit, offset, id })
        {
            return OrderService.getInstance().getOrdersByCustomer(limit, offset, id);
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
        },
        //-------------------------------------------------------------
        // Orders
        //-------------------------------------------------------------
        createOrder: (root: any, {input}) =>
        {
            return OrderService.getInstance().createOrder(input);
        },
        updateOrder: (root: any, {input}) =>
        {
            return OrderService.getInstance().updateOrder(input);
        },
        removeOrder: (root: any, {input}) =>
        {
            return OrderService.getInstance().removeOrder(input);
        }
    }
};
