import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OwnerController } from 'src/controllers/owner.controller';
import { Owner } from 'src/entities/owner.entity';
import { OwnerService } from 'src/services/owner.service';

@Module({
  imports: [TypeOrmModule.forFeature([Owner])],
  providers: [OwnerService],
  controllers: [OwnerController],
  exports: [OwnerService],
})
export class OwnerModule {}
