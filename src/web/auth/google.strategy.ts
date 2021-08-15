import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { config } from 'dotenv';

config();

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.SITE_URL + 'auth/google/redirect',
      scope: ['email', 'profile'],
    });
  }

  async validate(
    accessToken: string,
    refreshToken: string,
    profile: any,
  ): Promise<any> {
    const { name, emails, photos, id } = profile;
    const user = {
      google_id: id,
      email: emails[0].value,
      email_verified: emails[0].verified,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0] ? photos[0].value : null,
      google_access_token: accessToken,
    };
    return user;
  }
}
