import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(@Request() req: any): Promise<any> {
    return this._authservice.login(req.user);
  }
}
