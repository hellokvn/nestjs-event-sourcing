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
const event_sourcing_constants_1 = require("./event-sourcing.constants");
const event_sourcing_handler_1 = require("./event-sourcing.handler");
const event_sourcing_service_1 = require("./event-sourcing.service");
const SERVICES = [event_sourcing_service_1.EventSourcingService, event_sourcing_handler_1.EventSourcingHandler];
let EventSourcingModule = EventSourcingModule_1 = class EventSourcingModule {
    static forRoot(options) {
        return {
            module: EventSourcingModule_1,
            providers: [...SERVICES],
            exports: [...SERVICES],
        };
    }
    static forRootAsync(options) {
        const provider = {
            inject: [event_sourcing_constants_1.EVENT_SOURCING_MODULE_OPTIONS],
            provide: event_sourcing_constants_1.EVENT_SOURCING_TOKEN,
            useFactory: async (options) => options,
        };
        return {
            module: EventSourcingModule_1,
            imports: options.imports,
            providers: [...this.createAsyncProviders(options), provider, ...SERVICES],
            exports: [provider, ...SERVICES],
        };
    }
    static createAsyncProviders(options) {
        if (options.useExisting || options.useFactory) {
            return [this.createAsyncOptionsProvider(options)];
        }
        const useClass = options.useClass;
        return [
            this.createAsyncOptionsProvider(options),
            {
                provide: useClass,
                useClass,
            },
        ];
    }
    static createAsyncOptionsProvider(options) {
        if (options.useFactory) {
            return {
                provide: event_sourcing_constants_1.EVENT_SOURCING_MODULE_OPTIONS,
                useFactory: options.useFactory,
                inject: options.inject || [],
            };
        }
        const inject = [(options.useClass || options.useExisting)];
        return {
            provide: event_sourcing_constants_1.EVENT_SOURCING_MODULE_OPTIONS,
            useFactory: async (optionsFactory) => await optionsFactory.createEventSourcingModuleOptions(),
            inject,
        };
    }
};
EventSourcingModule = EventSourcingModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], EventSourcingModule);
exports.EventSourcingModule = EventSourcingModule;
//# sourceMappingURL=event-sourcing.module.js.map