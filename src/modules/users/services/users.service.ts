import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from '../dto/register-admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import bcrypt from 'bcrypt';
import { AdminExistsException } from '../exceptions/admin-exists.exception';

@Injectable()
export class UsersService {
  constructor(private readonly _adminRepository: AdminRepository) {}

  async registerAdmin(dto: RegisterAdminDto): Promise<Admin> {
    const { username, password } = dto;

    // check for duplicate usernames
    if ((await this.findAdminByUsername(username)) !== undefined) {
      throw new AdminExistsException(`Username ${username} already exists`);
    }

    // gen salt and hash
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(password, salt);

    const admin = this._adminRepository.create({
      username,
      password: hashedPw,
      salt,
    });

    return this._adminRepository.save(admin);
  }

  async findAdminByUsername(username: string): Promise<Admin | undefined> {
    return this._adminRepository
      .createQueryBuilder('admin')
      .where('admin.username = :username', { username })
      .getOne();
  }
}
