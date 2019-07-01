"use strict";
const Models = require("../models/mongo/models");
var AppControllers;
(function (AppControllers) {
    class ValidationsController {
        getValidators(req, res, next) {
            const className = req.params['for'];
            let instance = null;
            let validators = null;
            try {
                instance = Object.create(Models[className].prototype);
                validators = instance['__validators'];
            }
            catch (error) {
                res.send({
                    message: 'El tipo no existe o no se pasó el parámetro correctamente',
                    error: error.message
                });
            }
            res.send(validators);
        }
    }
    AppControllers.ValidationsController = ValidationsController;
})(AppControllers || (AppControllers = {}));
module.exports = AppControllers;
//# sourceMappingURL=validations.controller.js.map