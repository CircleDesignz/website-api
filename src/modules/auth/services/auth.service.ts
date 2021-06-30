import { HttpService, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import { Profile } from 'passport-github2';
import { SessionsService } from '@circle/modules/sessions/services/sessions.service';
@Injectable()
export class AuthService {
  constructor(
    private _httpservice: HttpService,
    private readonly _jwtService: JwtService,
    private readonly _sessionsService: SessionsService
  ) {}

  async validateByGitHub(accessToken: string, profile: Profile): Promise<any> {
    const res = await this._httpservice
      .get('https://api.github.com/user/orgs', {
        headers: { Authorization: `token ${accessToken}` },
      })
      .toPromise();

    const filteredOrgs = res.data.filter(
      (item: any) => item.login === 'CircleDesignz'
    );

    if (filteredOrgs.length !== 1) {
      throw new AdminValidationException('User is not authorized');
    }

    return this._sessionsService.createSession(profile.username);
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, password: user.password };

    return {
      access_token: this._jwtService.signAsync(payload),
    };
  }
}
