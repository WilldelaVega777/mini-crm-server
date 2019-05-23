"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan_middleware_1 = require("./middlewares/morgan.middleware");
const multer_middleware_1 = require("./middlewares/multer.middleware");
const database_1 = require("./config/database");
const system_routes_1 = require("./routes/system.routes");
class Server {
    static bootstrap() {
        return new Server();
    }
    constructor() {
        this.app = express();
        database_1.Database.getInstance().connect();
        this.configMiddlewares(this.app);
        this.configureModel();
        this.configureRouter(this.app);
    }
    configMiddlewares(app) {
        morgan_middleware_1.MorganMiddleware.getInstance(app).configure();
        multer_middleware_1.MulterMiddleware.getInstance(app).configure();
    }
    configureModel() {
    }
    configureRouter(app) {
        app.get('/', function (req, res) {
            res.send('App Funciona');
        });
        system_routes_1.SystemRoutes.getInstance(app).defineRoutes();
    }
}
const server = Server.bootstrap();
exports.App = server.app;
//# sourceMappingURL=app.js.map