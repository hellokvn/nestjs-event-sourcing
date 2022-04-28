"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourcingHandler = void 0;
const common_1 = require("@nestjs/common");
const event_sourcing_service_1 = require("./event-sourcing.service");
let EventSourcingHandler = class EventSourcingHandler {
    async save(aggregate) {
        await this.eventStoreService.saveEvents(aggregate);
    }
    async getById(aggregateClass, id) {
        const aggregate = new aggregateClass();
        const events = await this.eventStoreService.getEvents(id);
        if (!events || !events.length) {
            return aggregate;
        }
        if (events && events.length) {
            aggregate.loadFromHistory(events);
            aggregate.version = this.getLatestVersion(events);
        }
        return aggregate;
    }
    getLatestVersion(events) {
        return events.reduce((a, b) => (a.version > b.version ? a : b)).version;
    }
};
__decorate([
    (0, common_1.Inject)(event_sourcing_service_1.EventSourcingService),
    __metadata("design:type", event_sourcing_service_1.EventSourcingService)
], EventSourcingHandler.prototype, "eventStoreService", void 0);
EventSourcingHandler = __decorate([
    (0, common_1.Injectable)()
], EventSourcingHandler);
exports.EventSourcingHandler = EventSourcingHandler;
//# sourceMappingURL=event-sourcing.handler.js.map