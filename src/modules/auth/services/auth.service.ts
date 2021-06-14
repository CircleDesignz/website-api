import { Injectable } from '@nestjs/common';
import { UsersService } from '../../users/services/users.service';
import { Admin } from '../../users/entities/admin.entity';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _jwtService: JwtService
  ) {}

  async validateUser(username: string, password: string): Promise<Admin> {
    const admin = await this._usersService.findAdminByUsername(username);
    if (!admin) {
      throw new Error('username or password incorrect'); // TODO: better exception with interceptors
    }
    const hashedInput = await bcrypt.hash(password, admin.salt);

    if (hashedInput !== admin.password) {
      throw new Error('username or password incorrect');
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
