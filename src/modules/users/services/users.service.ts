import { Injectable } from '@nestjs/common';
import { RegisterAdminDto } from '../dto/register-admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminRepository } from '../repositories/admin.repository';

@Injectable()
export class UsersService {
  constructor(private readonly _adminRepository: AdminRepository) {}

  async registerAdmin(dto: RegisterAdminDto): Promise<Admin> {
    // TODO
    return;
  }
}
