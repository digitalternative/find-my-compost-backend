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
exports.FacebookOauthStrategy = void 0;
const passport_1 = require("@nestjs/passport");
const passport_facebook_1 = require("passport-facebook");
const common_1 = require("@nestjs/common");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
let FacebookOauthStrategy = class FacebookOauthStrategy extends (0, passport_1.PassportStrategy)(passport_facebook_1.Strategy, 'facebook') {
    constructor() {
        super({
            clientID: process.env.FACEBOOK_CLIENT_ID,
            clientSecret: process.env.FACEBOOK_SECRET,
            callbackURL: '/auth/facebook/redirect',
            scope: ['email'],
            profileFields: ['emails', 'displayName', 'id', 'name'],
        });
    }
    async validate(accessToken, refreshToken, profile) {
        const { id, displayName, emails } = profile;
        return {
            provider: 'facebook',
            facebookId: id,
            username: displayName,
            roles: ['user'],
            email: emails[0].value,
            password: '@FacebookId_' + id,
            passwordConfirm: '@FacebookId_' + id,
        };
    }
};
FacebookOauthStrategy = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FacebookOauthStrategy);
exports.FacebookOauthStrategy = FacebookOauthStrategy;
//# sourceMappingURL=facebook-oauth.strategy.js.map