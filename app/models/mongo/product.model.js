"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const typegoose_2 = require("typegoose");
const model_validations_helper_1 = require("../../helpers/model-validations.helper");
const model_validations_helper_2 = require("../../helpers/model-validations.helper");
class Product extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 80, min: 3, regex: model_validations_helper_2.Formats.all }),
    typegoose_2.prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, min: 2, max: 1000000, regex: model_validations_helper_2.Formats.price }),
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    typegoose_2.prop({ required: false }),
    __metadata("design:type", Number)
], Product.prototype, "projected_stock", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, min: 0, max: 10000, regex: model_validations_helper_2.Formats.quantity }),
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "stock", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, min: 0, max: 10000, regex: model_validations_helper_2.Formats.quantity }),
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Product.prototype, "reorder", void 0);
exports.Product = Product;
exports.productModel = new Product().getModelForClass(Product);
//# sourceMappingURL=product.model.js.map