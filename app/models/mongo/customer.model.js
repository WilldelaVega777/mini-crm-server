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
const customer_types_enum_1 = require("./enums/customer-types.enum");
const model_validations_helper_1 = require("../../helpers/model-validations.helper");
const model_validations_helper_2 = require("../../helpers/model-validations.helper");
class Customer extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Customer.prototype, "id", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 40, min: 3, regex: model_validations_helper_2.Formats.alpha }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Customer.prototype, "first_name", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 40, min: 3, regex: model_validations_helper_2.Formats.alpha }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Customer.prototype, "last_name", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 40, min: 3, regex: model_validations_helper_2.Formats.alpha }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Customer.prototype, "company", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 120, min: 18 }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", Number)
], Customer.prototype, "age", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", Number)
], Customer.prototype, "type", void 0);
__decorate([
    model_validations_helper_1.validations({ required: true, max: 40, min: 8, regex: model_validations_helper_2.Formats.email }),
    typegoose_2.prop({ required: false }),
    __metadata("design:type", Array)
], Customer.prototype, "emails", void 0);
__decorate([
    typegoose_2.prop({ required: false }),
    __metadata("design:type", Array)
], Customer.prototype, "orders", void 0);
exports.Customer = Customer;
exports.customerModel = new Customer().getModelForClass(Customer);
//# sourceMappingURL=customer.model.js.map