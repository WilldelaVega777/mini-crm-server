"use strict";
const express = require("express");
const serveFavicon = require("serve-favicon");
var AppMiddlewares;
(function (AppMiddlewares) {
    class StaticContentMiddleware {
        constructor(ea) {
            this.app = ea;
        }
        static getInstance(rt) {
            if (StaticContentMiddleware._instance == null) {
                StaticContentMiddleware._instance = new StaticContentMiddleware(rt);
            }
            return StaticContentMiddleware._instance;
        }
        configure() {
            this.app.use(express.static(__dirname + '../../../app/public'));
            this.app.use(express.static(__dirname + '../../../app/uploads'));
            this.app.use(serveFavicon(__dirname + '../../../app/public/images/favicon.ico'));
            this.app.set('view engine', 'ejs');
            this.app.set('views', __dirname + '../../../app/views');
        }
    }
    AppMiddlewares.StaticContentMiddleware = StaticContentMiddleware;
})(AppMiddlewares || (AppMiddlewares = {}));
module.exports = AppMiddlewares;
//# sourceMappingURL=static.middleware.js.map