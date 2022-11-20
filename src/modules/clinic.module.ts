import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClinicController } from 'src/controllers/clinic.controller';
import { Clinic } from 'src/entities/clinic.entity';
import { ClinicService } from 'src/services/clinic.service';

@Module({
  imports: [TypeOrmModule.forFeature([Clinic])],
  providers: [ClinicService],
  controllers: [ClinicController],
  exports: [ClinicService],
})
export class ClinicModule {}
