"use strict";
const cors = require("cors");
var AppMiddlewares;
(function (AppMiddlewares) {
    class CORSMiddleware {
        constructor(ea) {
            this.app = ea;
        }
        static getInstance(rt) {
            if (CORSMiddleware._instance == null) {
                CORSMiddleware._instance = new CORSMiddleware(rt);
            }
            return CORSMiddleware._instance;
        }
        configure() {
            this.app.use(cors());
        }
    }
    AppMiddlewares.CORSMiddleware = CORSMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=cors.middleware.js.map