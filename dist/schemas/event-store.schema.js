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
exports.EventModelSchema = exports.EventModel = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongodb_1 = require("mongodb");
const base_event_1 = require("../events/base.event");
let EventModel = class EventModel {
};
__decorate([
    (0, mongoose_1.Prop)({ name: '_id' }),
    __metadata("design:type", mongodb_1.ObjectId)
], EventModel.prototype, "id", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventModel.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], EventModel.prototype, "timeStamp", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventModel.prototype, "aggregateIdentifier", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventModel.prototype, "aggregateType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], EventModel.prototype, "eventType", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", base_event_1.BaseEvent)
], EventModel.prototype, "eventData", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Number)
], EventModel.prototype, "version", void 0);
EventModel = __decorate([
    (0, mongoose_1.Schema)({ collection: 'events' })
], EventModel);
exports.EventModel = EventModel;
exports.EventModelSchema = mongoose_1.SchemaFactory.createForClass(EventModel);
//# sourceMappingURL=event-store.schema.js.map