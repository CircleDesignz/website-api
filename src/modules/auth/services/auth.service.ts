import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Admin } from '../../users/entities/admin.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { AdminValidationException } from '@circle/modules/auth/exceptions/admin-validation.exception';
@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService
  ) {}

  async validateAdmin(username: string, password: string): Promise<Admin> {
    // query admin
    const admin = await this._usersService.findAdminByUsername(username);
    if (admin === undefined) {
      throw new AdminValidationException('Username or password is incorrect');
    }

    // compare to hashed pw
    const hashedInput = await bcrypt.hash(password, admin.salt);
    if (hashedInput !== admin.password) {
      throw new AdminValidationException('Username or password is incorrect');
    }

    return admin;
  }

  async login(user: any): Promise<any> {
    const payload = { username: user.username, password: user.password };

    return {
      access_token: this._jwtService.signAsync(payload),
    };
  }
}
