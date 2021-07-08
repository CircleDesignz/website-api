import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { SessionGuard } from '../guards/session.guard';
import { GitHubAuthGuard } from '../guards/github-auth.guard';

@Controller('auth')
export class AuthController {
  @UseGuards(GitHubAuthGuard)
  @Get('login')
  async authenticate(): Promise<any> {}

  @UseGuards(GitHubAuthGuard)
  @Get('callback')
  async callback(@Res() res: Response) {
    res.redirect('http://localhost:3001/admin/temp-index');
  }

  @UseGuards(SessionGuard)
  @Get()
  async authStatus(@Res() res: Response): Promise<any> {
    res.sendStatus(204);
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
    res.redirect('http://localhost:3001');
  }
}
