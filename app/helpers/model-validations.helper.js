"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Formats;
(function (Formats) {
    Formats["all"] = "(.*?)";
    Formats["alpha"] = "^^[a-zA-Z]+[-'s]?[a-zA-Z ]{1,40}$";
    Formats["alphanumeric"] = "^[a-zA-Z0-9_]*$";
    Formats["email"] = "^\\w+([\\.-]?\\w+)+@\\w+([\\.:]?\\w+)+(\\.[a-zA-Z0-9]{2,3})+$";
    Formats["phone"] = "^ [+] * [(]{ 0, 1}[0 - 9]{ 1, 4 } [)]{ 0, 1 } [-s./ 0 - 9] * $";
    Formats["credit_card"] = "^4[0-9]{12}(?:[0-9]{3})?$";
    Formats["price"] = "^d+(,d{1,2})?$";
    Formats["quantity"] = "\"^d+$\"";
})(Formats = exports.Formats || (exports.Formats = {}));
exports.validations = (validator) => {
    return (target, propertyKey) => {
        Object.defineProperty(validator, 'field', withValue(propertyKey));
        const propType = getTypeString(Reflect.getMetadata('design:type', target, propertyKey).toString()).toLowerCase();
        Object.defineProperty(validator, 'type', withValue(propType));
        if (!target['__validators']) {
            Object.defineProperty(target, '__validators', withValue([Object.assign({}, validator)]));
        }
        else {
            Object.defineProperty(target, '__validators', withValue(target['__validators'].concat([Object.assign({}, validator)])));
        }
    };
};
function withValue(value) {
    const d = withValue['d'] || (withValue['d'] = {
        enumerable: true,
        writable: true,
        configurable: true,
        value: null
    });
    d.value = value;
    return d;
}
function getTypeString(chunk) {
    return chunk.substring((chunk.indexOf('function') + 9), chunk.indexOf('('));
}
//# sourceMappingURL=model-validations.helper.js.map