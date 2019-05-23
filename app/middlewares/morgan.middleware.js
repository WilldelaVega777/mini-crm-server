"use strict";
const morgan = require("morgan");
var AppMiddlewares;
(function (AppMiddlewares) {
    class MorganMiddleware {
        constructor(ea) {
            this.app = ea;
            this.morgan = morgan;
        }
        static getInstance(rt) {
            if (MorganMiddleware._instance == null) {
                MorganMiddleware._instance = new MorganMiddleware(rt);
            }
            return MorganMiddleware._instance;
        }
        configure() {
            this.app.use(this.morgan('combined', ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent"'));
        }
    }
    AppMiddlewares.MorganMiddleware = MorganMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=morgan.middleware.js.map