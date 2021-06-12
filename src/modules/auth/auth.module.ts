import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './services/auth.service';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService],
})
export class AuthModule {}
