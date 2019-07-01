"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CustomersPaginated {
    constructor(pCustomers, pMetadata) {
        if (pCustomers) {
            this.customers = pCustomers;
        }
        if (pMetadata) {
            this.metadata = pMetadata;
        }
    }
}
exports.CustomersPaginated = CustomersPaginated;
//# sourceMappingURL=customers-paginated.model.js.map