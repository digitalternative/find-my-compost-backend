import { Profile, Strategy } from 'passport-facebook';
declare const FacebookOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class FacebookOauthStrategy extends FacebookOauthStrategy_base {
    constructor();
    validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any>;
}
export {};
