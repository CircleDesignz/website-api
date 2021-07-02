import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { GitHubStrategy } from './strategies/github.strategy';
import { AdminsModule } from '../admins/admins.module';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    AdminsModule,
    HttpModule,
    PassportModule.register({ session: true }),
  ],
  providers: [AuthService, GitHubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
