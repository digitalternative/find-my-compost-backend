import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
export declare class AppController {
    private authService;
    constructor(authService: AuthService);
    login(req: any): Promise<{
        email: any;
        access_token: string;
    }>;
    loginSocial(params: any, req: any, res: any, session: any): Promise<any>;
    googleAuth(): Promise<HttpStatus>;
    facebookAuth(): Promise<HttpStatus>;
    redirectFacebook(req: any, res: any, session: any): Promise<any>;
    redirectGoogle(req: any, res: any, session: any): Promise<any>;
}
