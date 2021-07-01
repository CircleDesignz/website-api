import {
  Controller,
  Get,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Response } from 'express';
import { SessionGuard } from '../guards/session.guard';
import { GitHubAuthGuard } from '../guards/github-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}

  @UseGuards(GitHubAuthGuard)
  @Get('login')
  async authenticateGitHub(@Res() res: Response): Promise<any> {}

  @UseGuards(GitHubAuthGuard)
  @Get('redirect')
  async redirect(@Res() res: Response) {
    res.redirect('http://localhost:3000/auth/test');
  }

  @UseGuards(SessionGuard)
  @Get('test')
  async test(): Promise<any> {
    return {
      message: 'Ok',
    };
  }
}
