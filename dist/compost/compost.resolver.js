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
exports.CompostResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const compost_service_1 = require("./compost.service");
const update_compost_input_1 = require("./dto/update-compost.input");
const gql_auth_guard_1 = require("../auth/gql-auth.guard");
const common_1 = require("@nestjs/common");
const role_enum_1 = require("../user/enums/role.enum");
const roles_decorator_1 = require("../user/decorators/roles.decorator");
const roles_guard_1 = require("../auth/roles.guard");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CompostResolver = class CompostResolver {
    constructor(mongoConnection, compostsService) {
        this.mongoConnection = mongoConnection;
        this.compostsService = compostsService;
    }
    findAll() {
        return this.compostsService.findAll();
    }
    async findMine(req) {
        return this.compostsService.findMine(req.user._id);
    }
    findOne(_id) {
        return this.compostsService.findOne(_id);
    }
    async createAll(createCompostInputs) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        const response = [];
        try {
            for (const createCompostInput of createCompostInputs) {
                response.push(this.compostsService.create(createCompostInput, session));
            }
            return response;
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    async update(updateCompostInput) {
        const session = await this.mongoConnection.startSession();
        session.startTransaction();
        try {
            const newCompost = await this.compostsService.update(updateCompostInput, session);
            await session.commitTransaction();
            return newCompost;
        }
        catch (error) {
            await session.abortTransaction();
            throw new common_1.BadRequestException(error);
        }
        finally {
            session.endSession();
        }
    }
    remove(_id) {
        return this.compostsService.remove(_id);
    }
};
__decorate([
    (0, graphql_1.Query)('composts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CompostResolver.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, graphql_1.Query)('myComposts'),
    __param(0, (0, graphql_1.Context)('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompostResolver.prototype, "findMine", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, graphql_1.Query)('compost'),
    __param(0, (0, graphql_1.Args)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompostResolver.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, graphql_1.Mutation)('createCompost'),
    __param(0, (0, graphql_1.Args)('createCompostInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CompostResolver.prototype, "createAll", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, graphql_1.Mutation)('updateCompost'),
    __param(0, (0, graphql_1.Args)('updateCompostInput')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_compost_input_1.UpdateCompostInput]),
    __metadata("design:returntype", Promise)
], CompostResolver.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthGuard, roles_guard_1.RolesGuard),
    (0, roles_decorator_1.Roles)(role_enum_1.Role.User),
    (0, graphql_1.Mutation)('removeCompost'),
    __param(0, (0, graphql_1.Args)('_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CompostResolver.prototype, "remove", null);
CompostResolver = __decorate([
    (0, graphql_1.Resolver)('Compost'),
    __param(0, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Connection,
        compost_service_1.CompostService])
], CompostResolver);
exports.CompostResolver = CompostResolver;
//# sourceMappingURL=compost.resolver.js.map