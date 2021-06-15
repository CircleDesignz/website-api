import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AdminLoginDto } from '../dto/admin-login.dto';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Body() dto: AdminLoginDto): Promise<any> {
    return this._authservice.login(dto);
  }
}
