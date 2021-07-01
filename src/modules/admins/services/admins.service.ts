import { Injectable } from '@nestjs/common';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class AdminsService {
  constructor(private readonly _adminRepo: AdminRepository) {}

  async registerAdmin(
    username: string,
    email?: string,
    avatar?: string
  ): Promise<Admin> {
    const admin = this._adminRepo.create({
      username,
      email,
      avatar,
    });

    return this._adminRepo.save(admin);
  }

  async findAdmin(username: string): Promise<Admin | undefined> {
    return this._adminRepo.findOne({ username });
  }
}
