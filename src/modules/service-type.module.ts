import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceTypeController } from '../controllers/service-type.controller';
import { ServiceType } from '../entities/service-type.entity';
import { ServiceTypeService } from '../services/service-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServiceType])],
  providers: [ServiceTypeService],
  controllers: [ServiceTypeController],
  exports: [ServiceTypeService],
})
export class ServiceTypeModule {}
