import { HttpService, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import { Profile } from 'passport-github2';
import { AdminsService } from '@circle/modules/admins/services/admins.service';

@Injectable()
export class AuthService {
  constructor(
    private _httpservice: HttpService,
    private readonly _jwtService: JwtService,
    private readonly _adminService: AdminsService
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

    const admin = await this._adminService.findAdmin(profile.username);

    if (admin) {
      return admin;
    }

    return this._adminService.registerAdmin(profile.username, null, null);
  }
}
