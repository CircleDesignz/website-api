import {
  Controller,
  Get,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { response, Response } from 'express';
import { GitHubAuthGuard } from '../guards/github-auth.guard';
import { AdminValidationInterceptor } from '../interceptors/admin-validation.interceptors';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}

  @Get('login')
  @UseInterceptors(AdminValidationInterceptor)
  @UseGuards(GitHubAuthGuard)
  async authenticateGitHub(@Res() res: Response): Promise<any> {
    res.send(200);
  }

  @Get('redirect')
  @UseInterceptors(AdminValidationInterceptor)
  @UseGuards(GitHubAuthGuard)
  async redirect(@Res() res: Response) {
    res.redirect('https://www.notcircle.ca');
  }
}
