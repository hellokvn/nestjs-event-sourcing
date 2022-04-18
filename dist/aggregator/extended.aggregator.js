"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedAggregateRoot = void 0;
const cqrs_1 = require("@nestjs/cqrs");
class ExtendedAggregateRoot extends cqrs_1.AggregateRoot {
    constructor() {
        super();
        this.version = -1;
    }
}
exports.ExtendedAggregateRoot = ExtendedAggregateRoot;
//# sourceMappingURL=extended.aggregator.js.map