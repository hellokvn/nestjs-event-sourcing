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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStoreService = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("@nestjs/common");
const mongoose_2 = require("@nestjs/mongoose");
const event_store_schema_1 = require("./schemas/event-store.schema");
let EventStoreService = class EventStoreService {
    constructor(eventModel) {
        this.eventModel = eventModel;
    }
    async saveEvents(aggregate) {
        const events = aggregate.getUncommittedEvents();
        console.log('AccountEventStore/saveEvents');
        const eventStream = await this.findByAggregateIdentifier(aggregate.id);
        if (aggregate.version != -1 && eventStream[eventStream.length - 1].version !== aggregate.version) {
            console.log('--- ERR --- ConcurrencyException');
        }
        let version = aggregate.version;
        events.forEach(async (event) => {
            const { constructor } = Object.getPrototypeOf(event);
            console.log('event', constructor.name);
            version++;
            event.version = version;
            const eventModel = new event_store_schema_1.EventModel();
            eventModel.aggregateIdentifier = aggregate.id;
            eventModel.aggregateType = aggregate.type;
            eventModel.eventType = constructor.name;
            eventModel.version = version;
            eventModel.eventData = event;
            eventModel.timeStamp = new Date();
            await this.save(eventModel);
        });
    }
    async getEvents(aggregateId) {
        console.log('AccountEventStore/getEvents', aggregateId);
        const eventStream = await this.findByAggregateIdentifier(aggregateId);
        if (!eventStream || !eventStream.length) {
            throw new common_1.HttpException('Incorrect account ID provided!', 500);
        }
        return eventStream.map((aggregate) => {
            aggregate.eventData.constructor = { name: aggregate.eventType };
            aggregate.eventData = Object.assign(Object.create(aggregate.eventData), aggregate.eventData);
            return aggregate.eventData;
        });
    }
    save(payload) {
        const model = new this.eventModel(payload);
        return model.save();
    }
    findByAggregateIdentifier(aggregateIdentifier) {
        return this.eventModel.find({ aggregateIdentifier }).exec();
    }
};
EventStoreService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)(event_store_schema_1.EventModel.name)),
    __metadata("design:paramtypes", [mongoose_1.Model])
], EventStoreService);
exports.EventStoreService = EventStoreService;
//# sourceMappingURL=event-store.service.js.map