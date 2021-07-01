import {
  Controller,
  Get,
  Req,
  Res,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionGuard } from '../guards/session.guard';
import { GitHubAuthGuard } from '../guards/github-auth.guard';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authservice: AuthService) {}

  @UseGuards(GitHubAuthGuard)
  @Get('login')
  async authenticateGitHub(@Req() req: Request): Promise<any> {}

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

  @UseGuards(SessionGuard)
  @Get('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    req.session.destroy((err) => {
      if (err) {
        throw err;
      }
    });
    req.logOut();
    res.redirect('https://notcircle.ca');
  }
}
