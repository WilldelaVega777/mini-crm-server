"use strict";
const multer = require("multer");
var AppMiddlewares;
(function (AppMiddlewares) {
    class MulterMiddleware {
        constructor(ea) {
            this.app = ea;
        }
        static getInstance(rt) {
            if (MulterMiddleware._instance == null) {
                MulterMiddleware._instance = new MulterMiddleware(rt);
            }
            return MulterMiddleware._instance;
        }
        configure() {
            let storage = multer.diskStorage({
                destination: function (req, file, cb) {
                    cb(null, "./uploads/inbox");
                },
                filename: function (req, file, cb) {
                    cb(null, file.fieldname + "-" + Date.now());
                }
            });
            this.upload = multer({
                dest: "./uploads",
                storage: storage
            });
            this.app.use(multer);
        }
    }
    AppMiddlewares.MulterMiddleware = MulterMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=multer.middleware.js.map