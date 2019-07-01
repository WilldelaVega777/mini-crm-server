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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const typegoose_1 = require("typegoose");
const typegoose_2 = require("typegoose");
const typegoose_3 = require("typegoose");
const Models = require("./models");
const bcrypt = require("bcrypt");
const model_validations_helper_1 = require("../../helpers/model-validations.helper");
const model_validations_helper_2 = require("../../helpers/model-validations.helper");
const jwt = require("jsonwebtoken");
class User extends typegoose_1.Typegoose {
    constructor(pUserName, pPassword) {
        super();
        if (pUserName) {
            this.username = pUserName;
        }
        if (pPassword) {
            this.password = pPassword;
        }
    }
    static addUser(pUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const userExists = yield Models.userModel.findOne({ username: pUser.username });
                    if (!userExists) {
                        const salt = yield bcrypt.genSalt(10);
                        const hash = yield bcrypt.hash(pUser.password, salt);
                        pUser.password = hash;
                        const newUser = yield Models.userModel.create(pUser);
                        newUser.id = newUser._id;
                        resolve(newUser);
                    }
                    else {
                        throw new Error('El usuario ya existe');
                    }
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static updateUser(pUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const salt = yield bcrypt.genSalt(10);
                    const hash = yield bcrypt.hash(pUser.password, salt);
                    pUser.password = hash;
                    Models.userModel.findOneAndUpdate({ _id: pUser.id }, pUser, { new: true }, (error, updatedUser) => {
                        if (error) {
                            reject(error);
                        }
                        else {
                            resolve(updatedUser);
                        }
                    });
                }
                catch (error) {
                    reject(error);
                }
            }));
        });
    }
    static authenticate(pUserName, pPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                const user = yield Models.userModel.findOne({
                    username: pUserName
                });
                if (!user) {
                    reject('User not found');
                }
                else {
                    const passed = yield bcrypt.compare(pPassword, user.password);
                    if (!passed) {
                        reject('Incorrect Password');
                    }
                    else {
                        try {
                            resolve({
                                token: User.createToken(user.username, process.env.SECRET, '1hr')
                            });
                        }
                        catch (error) {
                            reject(error);
                        }
                    }
                }
            }));
        });
    }
    static createToken(user, secret, expiresIn) {
        return jwt.sign({ user }, secret, { expiresIn: expiresIn });
    }
}
__decorate([
    typegoose_3.prop({ required: false }),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    typegoose_3.prop({ required: true }),
    model_validations_helper_1.validations({ required: true, max: 15, min: 4, regex: model_validations_helper_2.Formats.alphanumeric }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    typegoose_3.prop({ required: true }),
    model_validations_helper_1.validations({ required: true, max: 15, min: 4, regex: model_validations_helper_2.Formats.alphanumeric }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    typegoose_2.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "addUser", null);
__decorate([
    typegoose_2.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], User, "updateUser", null);
__decorate([
    typegoose_2.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], User, "authenticate", null);
__decorate([
    typegoose_2.staticMethod,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", String)
], User, "createToken", null);
exports.User = User;
exports.userModel = new User().getModelForClass(User);
//# sourceMappingURL=user.model.js.map