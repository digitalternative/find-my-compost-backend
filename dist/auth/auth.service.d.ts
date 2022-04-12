import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { Connection } from 'mongoose';
export declare class AuthService {
    private userService;
    private jwtService;
    private readonly mongoConnection;
    constructor(userService: UserService, jwtService: JwtService, mongoConnection: Connection);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        email: any;
        access_token: string;
    }>;
    loginWithSocial(data: any, social: string): Promise<{
        email: any;
        access_token: string;
    } | {
        error: string;
    }>;
}
