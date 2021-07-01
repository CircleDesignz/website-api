import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './repositories/admin.repository';
import { AdminsService } from './services/admins.service';

@Module({
  imports: [TypeOrmModule.forFeature([AdminRepository])],
  exports: [AdminsService],
  providers: [AdminsService]
})
export class AdminsModule {}
