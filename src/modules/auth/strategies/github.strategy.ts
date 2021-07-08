import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github2';
import { AuthService } from '../services/auth.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _authService: AuthService,
  ) {
    super({
      clientID: _configService.get('GITHUB_CLIENT_ID'),
      clientSecret: _configService.get('GITHUB_CLIENT_SECRET'),
      callbackURL: 'http://localhost:3000/auth/callback',
      scope: ['read:org']
    });
  }

  async validate(
    accessToken: string,
    _refreshToken: string,
    profile: Profile
  ): Promise<any> {
    return this._authService.validateAdmin(accessToken, profile);
  }
}
