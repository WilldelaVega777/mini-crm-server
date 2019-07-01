"use strict";
const system_controller_1 = require("../controllers/system.controller");
var AppRoutes;
(function (AppRoutes) {
    class SystemRoutes {
        constructor(rt) {
            this.router = rt;
        }
        static getInstance(rt) {
            if (SystemRoutes._instance != null) {
                return SystemRoutes._instance;
            }
            return new SystemRoutes(rt);
        }
        defineRoutes() {
            const systemController = new system_controller_1.SystemController();
            this.router.get('/api/health', systemController.checkHealth);
        }
    }
    AppRoutes.SystemRoutes = SystemRoutes;
})(AppRoutes || (AppRoutes = {}));
module.exports = AppRoutes;
//# sourceMappingURL=system.routes.js.map