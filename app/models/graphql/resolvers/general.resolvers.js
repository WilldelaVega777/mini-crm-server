"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../../../services/user.service");
const customer_service_1 = require("../../../services/customer.service");
const product_service_1 = require("../../../services/product.service");
const order_service_1 = require("../../../services/order.service");
const dashboard_service_1 = require("../../../services/dashboard.service");
exports.resolvers = {
    Query: {
        getCurrentLogin: (root, args, { currentUser }) => {
            console.log(`args: ${args}, currentUser: ${currentUser}, {currentUser}: ${{ currentUser }}`);
            return user_service_1.UserService.getInstance().getCurrentLogin(currentUser);
        },
        getUsers: (root, { limit, offset }) => {
            return user_service_1.UserService.getInstance().getUsersPaginated(limit, offset);
        },
        getUser: (root, { id }) => {
            return user_service_1.UserService.getInstance().getUserById(id);
        },
        getCustomers: (root, { limit, offset }) => {
            return customer_service_1.CustomerService.getInstance().getCustomersPaginated(limit, offset);
        },
        getCustomer: (root, { id }) => {
            return customer_service_1.CustomerService.getInstance().getCustomerById(id);
        },
        getProducts: (root, { limit, offset, stock }) => {
            return product_service_1.ProductService.getInstance().getProductsPaginated(limit, offset, stock);
        },
        getProduct: (root, { id }) => {
            return product_service_1.ProductService.getInstance().getProductById(id);
        },
        getOrders: (root, { limit, offset }) => {
            return order_service_1.OrderService.getInstance().getOrdersPaginated(limit, offset);
        },
        getOrder: (root, { id }) => {
            return order_service_1.OrderService.getInstance().getOrderById(id);
        },
        getOrdersByCustomer: (root, { limit, offset, id }) => {
            return order_service_1.OrderService.getInstance().getOrdersByCustomer(limit, offset, id);
        },
        getTopCustomers: () => {
            return dashboard_service_1.DashboardService.getInstance().getTopCustomers();
        }
    },
    Mutation: {
        authenticate: (root, { username, password }) => {
            return user_service_1.UserService.getInstance().authenticate(username, password);
        },
        createUser: (root, { input }) => __awaiter(this, void 0, void 0, function* () {
            return user_service_1.UserService.getInstance().createUser(input);
        }),
        updateUser: (root, { input }) => __awaiter(this, void 0, void 0, function* () {
            return user_service_1.UserService.getInstance().updateUser(input);
        }),
        removeUser: (root, { input }) => {
            return user_service_1.UserService.getInstance().removeUser(input);
        },
        createCustomer: (root, { input }) => {
            return customer_service_1.CustomerService.getInstance().createCustomer(input);
        },
        updateCustomer: (root, { input }) => {
            return customer_service_1.CustomerService.getInstance().updateCustomer(input);
        },
        removeCustomer: (root, { input }) => {
            return customer_service_1.CustomerService.getInstance().removeCustomer(input);
        },
        createProduct: (root, { input }) => {
            return product_service_1.ProductService.getInstance().createProduct(input);
        },
        updateProduct: (root, { input }) => {
            return product_service_1.ProductService.getInstance().updateProduct(input);
        },
        removeProduct: (root, { input }) => {
            return product_service_1.ProductService.getInstance().removeProduct(input);
        },
        createOrder: (root, { input }) => {
            return order_service_1.OrderService.getInstance().createOrder(input);
        },
        updateOrder: (root, { input }) => {
            return order_service_1.OrderService.getInstance().updateOrder(input);
        },
        removeOrder: (root, { input }) => {
            return order_service_1.OrderService.getInstance().removeOrder(input);
        }
    }
};
//# sourceMappingURL=general.resolvers.js.map