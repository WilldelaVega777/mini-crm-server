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
const mongoose = require("mongoose");
const typegoose_1 = require("typegoose");
const typegoose_2 = require("typegoose");
const order_status_enum_1 = require("./enums/order-status.enum");
class Order extends typegoose_1.Typegoose {
}
__decorate([
    typegoose_2.prop({ required: false }),
    __metadata("design:type", String)
], Order.prototype, "id", void 0);
__decorate([
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Date)
], Order.prototype, "date", void 0);
__decorate([
    typegoose_2.prop({ required: true }),
    __metadata("design:type", mongoose.Types.ObjectId)
], Order.prototype, "customer", void 0);
__decorate([
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "status", void 0);
__decorate([
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Array)
], Order.prototype, "items", void 0);
__decorate([
    typegoose_2.prop({ required: true }),
    __metadata("design:type", Number)
], Order.prototype, "total", void 0);
exports.Order = Order;
exports.orderModel = new Order().getModelForClass(Order);
//# sourceMappingURL=order.model.js.map