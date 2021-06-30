import { HttpService, Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Admin } from '../../users/entities/admin.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
import { Profile } from 'passport-github2';
@Injectable()
export class AuthService {
  constructor(
    private _httpservice: HttpService,
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService
  ) {}

  async validateByGitHub(accessToken: string, profile: Profile): Promise<any> {
    const res = await this._httpservice
      .get('https://api.github.com/user/orgs', {
        headers: { Authorization: `token ${accessToken}` },
      })
      .toPromise();

    const filteredOrgs = res.data.filter((item: any) => item.login === 'CircleDesignz');
    if (filteredOrgs.length !== 1) {
      throw new AdminValidationException('User is not authorized');
    }
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, password: user.password };

    return {
      access_token: this._jwtService.signAsync(payload),
    };
  }
}
