//---------------------------------------------------------------------
// Imports Section:
//---------------------------------------------------------------------
import { UserService }          from '../../../services/user.service';
import { CustomerService }      from '../../../services/customer.service';
import { ProductService }       from '../../../services/product.service';
import { OrderService }         from '../../../services/order.service';
import { DashboardService }     from '../../../services/dashboard.service';

//---------------------------------------------------------------------
// Resolvers:
//---------------------------------------------------------------------
export const resolvers = {
    //-----------------------------------------------------------------
    // Query Resolvers (Data):
    //-----------------------------------------------------------------
    Query: {
        //-------------------------------------------------------------
        // Security
        //-------------------------------------------------------------
        getCurrentLogin: (root: any, args, {currentUser}) => {

            // Debug:
            // console.log(
            //     `args: ${args}, currentUser: ${currentUser}, {currentUser}: ${{currentUser}}`
            // );

            return UserService.getInstance().getCurrentLogin(currentUser);
        },
        //-------------------------------------------------------------
        // Users
        //-------------------------------------------------------------
        getUsers: (root: any, {limit, offset}) => {
            return UserService.getInstance().getUsersPaginated(limit, offset);
        },
        getUser: (root: any, {id}) =>
        {
            return UserService.getInstance().getUserById(id);
        },
        //-------------------------------------------------------------
        // Customers
        //-------------------------------------------------------------
        getCustomers: (root: any, {limit, offset, salesman}) => {
            return CustomerService.getInstance().getCustomersPaginated(limit, offset, salesman);
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
        getOrdersByCustomer: (root: any, { limit, offset, id }) =>
        {
            return OrderService.getInstance().getOrdersByCustomer(limit, offset, id);
        },
        //-------------------------------------------------------------
        // Dashboard
        //-------------------------------------------------------------
        getTopCustomers: () =>
        {
            return DashboardService.getInstance().getTopCustomers();
        },
        //-------------------------------------------------------------
        getTopSellers: () =>
        {
            return DashboardService.getInstance().getTopSellers();
        }
    },
    //-----------------------------------------------------------------
    // Mutation Resolvers
    //-----------------------------------------------------------------
    Mutation: {
        //-------------------------------------------------------------
        // Security
        //-------------------------------------------------------------
        authenticate: (root: any, { username, password }) =>
        {
            return UserService.getInstance().authenticate(username, password);
        },
        //-------------------------------------------------------------
        // Users
        //-------------------------------------------------------------
        createUser: async (root: any, { input }) =>
        {
            return UserService.getInstance().createUser(input);
        },
        updateUser: async (root: any, { input }) =>
        {
            return UserService.getInstance().updateUser(input);
        },
        removeUser: (root: any, { input }) =>
        {
            return UserService.getInstance().removeUser(input);
        },
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
