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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const user_service_1 = require("../user/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let AuthService = class AuthService {
    constructor(userService, jwtService, mongoConnection) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.mongoConnection = mongoConnection;
    }
    async validateUser(email, password) {
        const user = await this.userService.findOne(email);
        if (user && user.password === password) {
            return user;
        }
        return null;
    }
    async login(user) {
        const payload = {
            username: user.username,
            email: user.email,
            password: user.password,
            roles: user.roles,
            _id: user._id,
        };
        return {
            email: user.email,
            access_token: this.jwtService.sign(payload),
        };
    }
    async loginWithSocial(data, social) {
        let user = {
            username: '',
            password: '',
            roles: [],
            email: '',
            _id: {},
        };
        if (social == 'google') {
            user = await this.userService.findByGoogleId(data.googleId);
        }
        else if (social == 'facebook') {
            user = await this.userService.findByFacebookId(data.facebookId);
        }
        const userMail = await this.userService.findOne(data.email);
        if (user == null) {
            if (userMail == null) {
                const session = await this.mongoConnection.startSession();
                user = await this.userService.create(data, session);
            }
            else {
                return {
                    error: ['Email linked to ', social, ' already have an account.'].join(''),
                };
            }
        }
        return await this.login({
            username: user.username,
            email: user.email,
            password: user.password,
            roles: user.roles,
            _id: user._id,
        });
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        mongoose_2.Connection])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map