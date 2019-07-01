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
class ProductService {
    static getInstance() {
        if (ProductService._instance == null) {
            ProductService._instance = new ProductService();
        }
        return ProductService._instance;
    }
    constructor() { }
    getProducts(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.productModel.find({}).limit(limit).skip(offset)
                .then((products) => {
                resolve(products.map(product => {
                    product.id = product['_id'];
                    return product;
                }));
            })
                .catch(error => reject(error));
        });
    }
    getProductsPaginated(limit, offset, stock = false) {
        return new Promise((resolve, reject) => {
            let filter;
            if (stock) {
                filter = { projected_stock: { $gt: 0 } };
            }
            Models.productModel.find(filter).limit(limit).skip(offset)
                .then((products) => {
                const readyProducts = (products.map(product => {
                    product.id = product['_id'];
                    return product;
                }));
                Models.productModel.countDocuments({}, (error, count) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const productsMetadata = new Models.PaginatedMetadata(count);
                        resolve(new Models.ProductsPaginated(readyProducts, productsMetadata));
                    }
                });
            })
                .catch(error => reject(error));
        });
    }
    getProductById(id) {
        return new Promise((resolve, reject) => {
            Models.productModel.findById(id, (error, product) => {
                if (error) {
                    reject(error);
                }
                else {
                    product.id = product['_id'];
                    resolve(product);
                }
            });
        });
    }
    createProduct(input) {
        return __awaiter(this, void 0, void 0, function* () {
            input.projected_stock = input.stock;
            const newProduct = yield Models.productModel.create(input);
            newProduct.id = newProduct._id;
            return Promise.resolve(newProduct);
        });
    }
    updateProduct(input) {
        return new Promise((resolve, reject) => {
            Models.productModel.findOneAndUpdate({ _id: input.id }, input, { new: true }, (error, product) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(product);
                }
            });
        });
    }
    removeProduct(input) {
        return new Promise((resolve, reject) => {
            Models.productModel.findOneAndRemove({ _id: input }, (error) => {
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
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map