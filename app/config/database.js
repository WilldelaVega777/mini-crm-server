"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
class Database {
    static getInstance() {
        if (Database._instance == null) {
            Database._instance = new Database();
        }
        return Database._instance;
    }
    constructor() {
    }
    connect() {
        mongoose_1.connect('mongodb://localhost/authDB', {
            useNewUrlParser: true
        })
            .then(db => console.log('DB is connected'))
            .catch(error => console.error(error));
    }
}
exports.Database = Database;
//# sourceMappingURL=database.js.map