import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GitHubStrategy } from './strategies/github.strategy';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'temp', // TODO: generate and store
    }),
  ],
  providers: [AuthService, LocalStrategy, GitHubStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
