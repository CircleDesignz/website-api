import { HttpModule, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { GitHubStrategy } from './strategies/github.strategy';
import { AdminsModule } from '../admins/admins.module';
import { SessionSerializer } from './utils/session.serializer';

@Module({
  imports: [
    AdminsModule,
    HttpModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'temp', // TODO: generate and store
    }),
  ],
  providers: [AuthService, GitHubStrategy, SessionSerializer],
  controllers: [AuthController],
})
export class AuthModule {}
