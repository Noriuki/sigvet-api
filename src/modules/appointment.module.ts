import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppointmentController } from 'src/controllers/appointment.controller';
import { Appointment } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';
import { ServiceModule } from './service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Appointment]), ServiceModule],
  providers: [AppointmentService],
  controllers: [AppointmentController],
  exports: [AppointmentService],
})
export class AppointmentModule {}
