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
const models_1 = require("../models/mongo/models");
class DashboardService {
    static getInstance() {
        if (DashboardService._instance == null) {
            DashboardService._instance = new DashboardService();
        }
        return DashboardService._instance;
    }
    constructor() { }
    getTopCustomers() {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            const mongoQuery = [
                {
                    '$match': {
                        'status': 'DISPATCHED'
                    }
                },
                {
                    '$group': {
                        '_id': '$customer',
                        'total': {
                            '$sum': '$total'
                        }
                    }
                },
                {
                    '$lookup': {
                        'from': 'customers',
                        'localField': '_id',
                        'foreignField': '_id',
                        'as': 'Customer'
                    }
                },
                {
                    '$sort': {
                        'total': -1
                    }
                },
                {
                    '$limit': 10
                }
            ];
            try {
                const queryResult = yield models_1.orderModel.aggregate(mongoQuery);
                const result = queryResult.map((result) => {
                    return {
                        id: result._id,
                        name: `${result.Customer[0].first_name} ${result.Customer[0].last_name}`,
                        total: result.total
                    };
                });
                resolve(result);
            }
            catch (error) {
                reject(error);
            }
        }));
    }
}
exports.DashboardService = DashboardService;
//# sourceMappingURL=dashboard.service.js.map