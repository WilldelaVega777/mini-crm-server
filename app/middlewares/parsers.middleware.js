"use strict";
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
var AppMiddlewares;
(function (AppMiddlewares) {
    class ParsersMiddleware {
        constructor(ea) {
            this.app = ea;
        }
        static getInstance(rt) {
            if (ParsersMiddleware._instance == null) {
                ParsersMiddleware._instance = new ParsersMiddleware(rt);
            }
            return ParsersMiddleware._instance;
        }
        configure() {
            this.app.use(bodyParser.json());
            this.app.use(bodyParser.urlencoded({ extended: true }));
            this.app.use(cookieParser());
        }
    }
    AppMiddlewares.ParsersMiddleware = ParsersMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=parsers.middleware.js.map