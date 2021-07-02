import { HttpService, Injectable } from '@nestjs/common';
import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import { Profile } from 'passport-github2';
import { AdminsService } from '@circle/modules/admins/services/admins.service';
import { Admin } from '@circle/modules/admins/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private _httpservice: HttpService,
    private readonly _adminService: AdminsService
  ) {}

  async validateByGitHub(
    accessToken: string,
    profile: Profile
  ): Promise<Admin> {
    const response = await this._httpservice
      .get('https://api.github.com/user/orgs', {
        headers: { Authorization: `token ${accessToken}` },
      })
      .toPromise();

    const targetOrg = response.data.find(
      (org: any) => org.login === 'CircleDesignz'
    );

    if (targetOrg === undefined) {
      throw new AdminValidationException('User is not authorized');
    }

    const admin = await this._adminService.findAdmin(profile.username);

    if (admin) {
      return admin;
    }

    return this._adminService.registerAdmin(
      profile.username,
      profile.emails[0]['value'],
      profile.photos[0]['value']
    );
  }
}
