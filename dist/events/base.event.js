"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    constructor(id, version) {
        if (id) {
            this.id = id;
        }
        if (version) {
            this.version = version;
        }
    }
}
exports.BaseEvent = BaseEvent;
//# sourceMappingURL=base.event.js.map