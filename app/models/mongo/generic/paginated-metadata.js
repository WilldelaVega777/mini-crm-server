"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PaginatedMetadata {
    constructor(pTotalRecords) {
        if (pTotalRecords) {
            this.totalRecords = pTotalRecords;
        }
        else {
            this.totalRecords = 0;
        }
    }
}
exports.PaginatedMetadata = PaginatedMetadata;
const x = new PaginatedMetadata();
//# sourceMappingURL=paginated-metadata.js.map