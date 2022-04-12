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
exports.CompostService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let CompostService = class CompostService {
    constructor(CompostModel) {
        this.CompostModel = CompostModel;
    }
    async create(CreateCompostInput, session) {
        let newCompost = new this.CompostModel(CreateCompostInput);
        try {
            newCompost = await newCompost.save({ session });
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return await newCompost;
    }
    async findAll() {
        return this.CompostModel.find().populate('user', 'username email').exec();
    }
    async findMine(userId) {
        return this.CompostModel.find({ user: userId })
            .populate('user', 'username email')
            .exec();
    }
    async findOne(_id) {
        return this.CompostModel.findById(_id).exec();
    }
    async update(updateCompostInput, session) {
        let updateCompost;
        try {
            updateCompost = await this.CompostModel.findByIdAndUpdate(updateCompostInput._id, updateCompostInput)
                .session(session)
                .exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error);
        }
        return updateCompost;
    }
    async remove(_id) {
        return this.CompostModel.findByIdAndRemove(_id).exec();
    }
};
CompostService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Compost')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CompostService);
exports.CompostService = CompostService;
//# sourceMappingURL=compost.service.js.map