"use strict";
var AppControllers;
(function (AppControllers) {
    class SystemController {
        checkHealth(req, res, next) {
            res.send('Controller Sanity Check Passed!');
        }
    }
    AppControllers.SystemController = SystemController;
})(AppControllers || (AppControllers = {}));
module.exports = AppControllers;
//# sourceMappingURL=system.controller.js.map