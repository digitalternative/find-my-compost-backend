"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompostModule = void 0;
const common_1 = require("@nestjs/common");
const compost_service_1 = require("./compost.service");
const compost_resolver_1 = require("./compost.resolver");
const compost_schema_1 = require("./schemas/compost.schema");
const mongoose_1 = require("@nestjs/mongoose");
let CompostModule = class CompostModule {
};
CompostModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: 'Compost', schema: compost_schema_1.CompostSchema }]),
        ],
        providers: [compost_resolver_1.CompostResolver, compost_service_1.CompostService],
    })
], CompostModule);
exports.CompostModule = CompostModule;
//# sourceMappingURL=compost.module.js.map