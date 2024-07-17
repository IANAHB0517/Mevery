import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import {
  ENV_OAUTH_GOOGLE_CLIENT_ID,
  ENV_OAUTH_GOOGLE_PASSWORD,
} from './common/const/env-keys.const';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env[ENV_OAUTH_GOOGLE_CLIENT_ID],
      clientSecret: process.env[ENV_OAUTH_GOOGLE_PASSWORD],

      callbackURL: 'http://localhost:3000/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  // refreshToken을 얻고 싶다면 해당 메서드 설정 필수
  authorizationParams(): { [key: string]: string } {
    return {
      access_type: 'offline',
      prompt: 'select_account',
    };
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
    done: VerifyCallback,
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.familyName,
      lastName: name.givenName,
      picture: photos[0].value,
      accessToken,
      refreshToken,
    };
    done(null, user);
  }
}
