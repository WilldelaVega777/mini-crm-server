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
const Models = require("../models/mongo/models");
class CustomerService {
    static getInstance() {
        if (CustomerService._instance == null) {
            CustomerService._instance = new CustomerService();
        }
        return CustomerService._instance;
    }
    constructor() { }
    getCustomers(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.customerModel.find({}).limit(limit).skip(offset)
                .then((customers) => {
                resolve(customers.map(customer => {
                    customer.id = customer['_id'];
                    return customer;
                }));
            })
                .catch(error => reject(error));
        });
    }
    getCustomersPaginated(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.customerModel.find({}).limit(limit).skip(offset)
                .then((customers) => {
                const readyCustomers = (customers.map(customer => {
                    customer.id = customer['_id'];
                    return customer;
                }));
                Models.customerModel.countDocuments({}, (error, count) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const customersMetadata = new Models.PaginatedMetadata(count);
                        resolve(new Models.CustomersPaginated(readyCustomers, customersMetadata));
                    }
                });
            })
                .catch(error => reject(error));
        });
    }
    getCustomerById(id) {
        return new Promise((resolve, reject) => {
            Models.customerModel.findById(id, (error, customer) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(customer);
                }
            });
        });
    }
    createCustomer(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCustomer = yield Models.customerModel.create(input);
            newCustomer.id = newCustomer._id;
            return Promise.resolve(newCustomer);
        });
    }
    updateCustomer(input) {
        return new Promise((resolve, reject) => {
            Models.customerModel.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, customer) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(customer);
                }
            });
        });
    }
    removeCustomer(input) {
        return new Promise((resolve, reject) => {
            Models.customerModel.findOneAndRemove({ _id: input }, (error) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve('Se eliminó el registro!');
                }
            });
        });
    }
}
exports.CustomerService = CustomerService;
//# sourceMappingURL=customer.service.js.map