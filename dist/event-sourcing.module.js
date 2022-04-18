"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var EventSourcingModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventSourcingModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const event_store_service_1 = require("./event-store.service");
const event_store_schema_1 = require("./schemas/event-store.schema");
let EventSourcingModule = EventSourcingModule_1 = class EventSourcingModule {
    static forRoot(opts) {
        return {
            global: true,
            module: EventSourcingModule_1,
            imports: [
                mongoose_1.MongooseModule.forRoot(opts.mongoUrl),
                mongoose_1.MongooseModule.forFeature([
                    { name: event_store_schema_1.EventModel.name, schema: event_store_schema_1.EventModelSchema },
                ]),
            ],
            providers: [event_store_service_1.EventStoreService],
            exports: [event_store_service_1.EventStoreService],
        };
    }
};
EventSourcingModule = EventSourcingModule_1 = __decorate([
    (0, common_1.Module)({})
], EventSourcingModule);
exports.EventSourcingModule = EventSourcingModule;
//# sourceMappingURL=event-sourcing.module.js.map