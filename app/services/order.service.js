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
const mongoose = require("mongoose");
const Models = require("../models/mongo/models");
class OrderService {
    static getInstance() {
        if (OrderService._instance == null) {
            OrderService._instance = new OrderService();
        }
        return OrderService._instance;
    }
    constructor() { }
    getOrders(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.orderModel.find({}).limit(limit).skip(offset)
                .then((orders) => {
                resolve(orders.map(order => {
                    order.id = order['_id'];
                    return order;
                }));
            })
                .catch(error => reject(error));
        });
    }
    getOrdersPaginated(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.orderModel.find({}).limit(limit).skip(offset)
                .then((orders) => {
                const readyOrders = (orders.map(order => {
                    order.id = order['_id'];
                    return order;
                }));
                Models.orderModel.countDocuments({}, (error, count) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const ordersMetadata = new Models.PaginatedMetadata(count);
                        resolve(new Models.OrdersPaginated(readyOrders, ordersMetadata));
                    }
                });
            })
                .catch(error => reject(error));
        });
    }
    getOrderById(id) {
        return new Promise((resolve, reject) => {
            Models.orderModel.findById(id, (error, order) => {
                if (error) {
                    reject(error);
                }
                else {
                    order.id = order['_id'];
                    resolve(order);
                }
            });
        });
    }
    getOrdersByCustomer(limit, offset, customerId) {
        return new Promise((resolve, reject) => {
            Models.orderModel.find({ customer: { $eq: new mongoose.mongo.ObjectId(customerId) } }).limit(limit).skip(offset)
                .then((orders) => {
                const readyOrders = (orders.map(order => {
                    order.id = order['_id'];
                    return order;
                }));
                Models.orderModel.countDocuments({ customer: { $eq: new mongoose.mongo.ObjectId(customerId) } }, (error, count) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const ordersMetadata = new Models.PaginatedMetadata(count);
                        resolve(new Models.OrdersPaginated(readyOrders, ordersMetadata));
                    }
                });
            })
                .catch(error => reject(error));
        });
    }
    createOrder(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    input.customer = yield new mongoose.mongo.ObjectId(input.customer);
                    input['_id'] = yield new mongoose.mongo.ObjectId();
                    input['id'] = input['_id'].toString();
                    input.items.map((orderItem) => __awaiter(this, void 0, void 0, function* () {
                        orderItem['_id'] = yield new mongoose.mongo.ObjectId();
                        orderItem.id = (orderItem['_id']).toString();
                        orderItem.product['_id'] =
                            yield new mongoose.mongo.ObjectId(orderItem.product.id);
                        return orderItem;
                    }));
                    input.items.forEach((orderItem) => __awaiter(this, void 0, void 0, function* () {
                        yield Models.productModel.updateOne({ _id: orderItem.product.id }, {
                            '$inc': {
                                'projected_stock': `-${orderItem.quantity}`
                            }
                        });
                    }));
                    const newOrder = yield Models.orderModel.create(input);
                    newOrder['id'] = newOrder['_id'];
                    Models.orderModel.findOneAndUpdate({ _id: input.id }, newOrder, { new: true }, (error, order) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(order);
                        }
                    });
                    const customerToUpdate = yield Models.customerModel.findById(newOrder.customer);
                    if (!customerToUpdate.orders) {
                        customerToUpdate.orders = [];
                    }
                    customerToUpdate.orders = customerToUpdate.orders.concat([newOrder]);
                    yield Models.customerModel.findOneAndUpdate({ _id: customerToUpdate['_id'] }, customerToUpdate, { new: false });
                    resolve(newOrder);
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    updateOrder(input) {
        let operation;
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            if (input.status.toString() === 'DISPATCHED') {
                operation = '-';
            }
            else if (input.status.toString() === 'CANCELLED') {
                operation = '+';
            }
            input.items.forEach((orderItem) => __awaiter(this, void 0, void 0, function* () {
                if (operation === '-') {
                    yield Models.productModel.updateOne({ _id: orderItem.product.id }, {
                        '$inc': {
                            'stock': `${operation}${orderItem.quantity}`
                        }
                    });
                }
                if (operation === '+') {
                    yield Models.productModel.updateOne({ _id: orderItem.product.id }, {
                        '$inc': {
                            'projected_stock': `${operation}${orderItem.quantity}`
                        }
                    });
                }
            }));
            input.customer = yield new mongoose.mongo.ObjectId(input.customer);
            Models.orderModel.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, order) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(order);
                }
            });
        }));
    }
    removeOrder(input) {
        return new Promise((resolve, reject) => {
            Models.orderModel.findOneAndRemove({ _id: input }, (error) => {
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
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map