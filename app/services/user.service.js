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
class UserService {
    static getInstance() {
        if (UserService._instance == null) {
            UserService._instance = new UserService();
        }
        return UserService._instance;
    }
    constructor() { }
    authenticate(username, password) {
        return __awaiter(this, void 0, void 0, function* () {
            return Models.userModel.authenticate(username, password);
        });
    }
    getCurrentLogin(pUser) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
                if (!pUser) {
                    reject('No existe usuario logueado');
                }
                console.log(pUser);
                const currentUser = yield Models.userModel.findOne({
                    username: pUser.username
                });
                resolve(currentUser);
            }));
        });
    }
    getUsersPaginated(limit, offset) {
        return new Promise((resolve, reject) => {
            Models.userModel.find({}).limit(limit).skip(offset)
                .then((users) => {
                const readyUsers = (users.map(user => {
                    user.id = user['_id'];
                    return user;
                }));
                Models.userModel.countDocuments({}, (error, count) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        const usersMetadata = new Models.PaginatedMetadata(count);
                        resolve(new Models.UsersPaginated(readyUsers, usersMetadata));
                    }
                });
            })
                .catch(error => reject(error));
        });
    }
    getUserById(id) {
        return new Promise((resolve, reject) => {
            Models.userModel.findById(id, (error, user) => {
                if (error) {
                    reject(error);
                }
                else {
                    resolve(user);
                }
            });
        });
    }
    createUser(input) {
        return __awaiter(this, void 0, void 0, function* () {
            return Models.userModel.addUser(input);
        });
    }
    updateUser(input) {
        return Models.userModel.updateUser(input);
    }
    removeUser(input) {
        return new Promise((resolve, reject) => {
            Models.userModel.findOneAndRemove({ _id: input }, (error) => {
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
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map