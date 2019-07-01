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
const credential_schema_1 = require("../models/mongo/express-schemas/credential.schema");
class AuthService {
    constructor() { }
    signIn(pEmail, pPassword) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const credential = yield credential_schema_1.credentialModel.find({
                    email: pEmail,
                    password: pPassword
                });
                resolve(credential);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
    createTestCredential() {
        credential_schema_1.credentialModel.create({
            user: "info@willdelavega.com",
            password: "12345"
        });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map