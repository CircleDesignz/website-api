import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterAdminDto } from '../dto/register-admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';
import bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private readonly _adminRepository: AdminRepository) {}

  async registerAdmin(dto: RegisterAdminDto): Promise<Admin> {
    const { username, password } = dto;

    console.log(await this.findAdminByUsername(username))
    if ((await this.findAdminByUsername(username)) !== undefined) {
      throw new ConflictException(`Username ${username} already exists`);
    }

    // hash
    const salt = await bcrypt.genSalt();
    const hashedPw = await bcrypt.hash(password, salt);

    const admin = this._adminRepository.create({
      username,
      password: hashedPw,
      salt,
    });

    return this._adminRepository.save(admin);
  }

  async findAdminByUsername(username: string): Promise<Admin> {
    return this._adminRepository
      .createQueryBuilder('admin')
      .where('admin.username = :username', { username })
      .getOne();
  }
}
