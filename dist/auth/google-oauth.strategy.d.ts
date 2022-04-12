import { Profile, Strategy } from 'passport-google-oauth20';
declare const GoogleOauthStrategy_base: new (...args: any[]) => Strategy;
export declare class GoogleOauthStrategy extends GoogleOauthStrategy_base {
    constructor();
    validate(_accessToken: string, _refreshToken: string, profile: Profile): Promise<{
        provider: string;
        googleId: string;
        username: string;
        roles: string[];
        email: string;
        password: string;
        passwordConfirm: string;
    }>;
}
export {};
