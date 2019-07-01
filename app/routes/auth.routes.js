"use strict";
const auth_controller_1 = require("../controllers/auth.controller");
var AppRoutes;
(function (AppRoutes) {
    class AuthRoutes {
        constructor(rt) {
            this.router = rt;
        }
        static getInstance(rt) {
            if (AuthRoutes._instance != null) {
                return AuthRoutes._instance;
            }
            return new AuthRoutes(rt);
        }
        defineRoutes() {
            let authController = new auth_controller_1.AuthController();
            this.router.get('/login', authController.showLogin);
        }
    }
    AppRoutes.AuthRoutes = AuthRoutes;
})(AppRoutes || (AppRoutes = {}));
module.exports = AppRoutes;
//# sourceMappingURL=auth.routes.js.map