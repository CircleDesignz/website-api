import {
  Body,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { RegisterAdminDto } from '../dto/register-admin.dto';
import { Admin } from '../entities/admin.entity';
import { AdminExistsInterceptor } from '../interceptors/admin-exists.interceptors';
import { UsersService } from '../services/users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Post()
  @UseInterceptors(AdminExistsInterceptor)
  async registerAdmin(@Body() dto: RegisterAdminDto): Promise<Admin> {
    return this._usersService.registerAdmin(dto);
  }
}
