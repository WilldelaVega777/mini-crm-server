"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const morgan_middleware_1 = require("./middlewares/morgan.middleware");
const parsers_middleware_1 = require("./middlewares/parsers.middleware");
const static_middleware_1 = require("./middlewares/static.middleware");
const graphql_middleware_1 = require("./middlewares/graphql.middleware");
const cors_middleware_1 = require("./middlewares/cors.middleware");
const database_1 = require("./config/database");
const validation_routes_1 = require("./routes/validation.routes");
class Server {
    constructor() {
        this.app = express();
        database_1.Database.getInstance().connect();
        this.configMiddlewares(this.app);
        this.configRouter(this.app);
    }
    static bootstrap() {
        return new Server();
    }
    getExpressServer() {
        return this.app;
    }
    configMiddlewares(app) {
        morgan_middleware_1.MorganMiddleware.getInstance(app).configure();
        parsers_middleware_1.ParsersMiddleware.getInstance(app).configure();
        static_middleware_1.StaticContentMiddleware.getInstance(app).configure();
        cors_middleware_1.CORSMiddleware.getInstance(app).configure();
        graphql_middleware_1.GraphQLMiddleware.getInstance().configure(app);
    }
    configRouter(app) {
        validation_routes_1.ValidationRoutes.getInstance(app).defineRoutes();
    }
}
const server = Server.bootstrap();
exports.ExpressApp = server.getExpressServer();
//# sourceMappingURL=app.js.map