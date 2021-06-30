import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GitHubStrategy } from './strategies/github.strategy';
import { SessionsModule } from '../sessions/sessions.module';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    SessionsModule,
    JwtModule.register({
      secret: 'temp', // TODO: generate and store
    }),
  ],
  providers: [AuthService, GitHubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
