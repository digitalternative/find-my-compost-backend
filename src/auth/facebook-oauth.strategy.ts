import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-facebook';
import { Injectable } from '@nestjs/common';
import { config } from 'dotenv';

config();

@Injectable()
export class FacebookOauthStrategy extends PassportStrategy(
  Strategy,
  'facebook',
) {
  constructor() {
    super({
      clientID: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
      callbackURL: '/auth/facebook/redirect',
      scope: ['email'],
      profileFields: ['emails', 'displayName', 'id', 'name'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
  ): Promise<any> {
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
}
