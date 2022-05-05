import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (user && user.password === password) {
      return user;
    }
    return null;
  }

  async login(user: any) {
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

  async loginWithSocial(data: any, social: string) {
    let user = {
      username: '',
      password: '',
      roles: [],
      email: '',
      _id: {},
    };

    if (social == 'google') {
      user = await this.userService.findByGoogleId(data.googleId);
    } else if (social == 'facebook') {
      user = await this.userService.findByFacebookId(data.facebookId);
    }

    const userMail = await this.userService.findOne(data.email);

    if (user == null) {
      if (userMail == null) {
        const session = await this.mongoConnection.startSession();
        user = await this.userService.create(data, session);
      } else {
        return {
          error: ['Email linked to ', social, ' already have an account.'].join(
            '',
          ),
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
}
