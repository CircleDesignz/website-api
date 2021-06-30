import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionRepository } from './repositories/session.repository';
import { SessionsService } from './services/sessions.service';

@Module({
  imports: [TypeOrmModule.forFeature([SessionRepository])],
  exports: [SessionsService],
  providers: [SessionsService],
})
export class SessionsModule {}
