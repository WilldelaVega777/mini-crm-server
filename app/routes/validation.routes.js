"use strict";
const validations_controller_1 = require("../controllers/validations.controller");
var AppRoutes;
(function (AppRoutes) {
    class ValidationRoutes {
        constructor(rt) {
            this.router = rt;
        }
        static getInstance(rt) {
            if (ValidationRoutes._instance != null) {
                return ValidationRoutes._instance;
            }
            return new ValidationRoutes(rt);
        }
        defineRoutes() {
            const validationsController = new validations_controller_1.ValidationsController();
            this.router.get('/api/validations/:for', validationsController.getValidators);
        }
    }
    AppRoutes.ValidationRoutes = ValidationRoutes;
})(AppRoutes || (AppRoutes = {}));
module.exports = AppRoutes;
//# sourceMappingURL=validation.routes.js.map