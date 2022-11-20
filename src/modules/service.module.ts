import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceController } from 'src/controllers/service.controller';
import { Service } from 'src/entities/service.entity';
import { MailModule } from 'src/mail/mail.module';
import { ServicesService } from 'src/services/services.service';
import { AppointmentModule } from './appointment.module';

@Module({
  imports: [
    forwardRef(() => AppointmentModule),
    TypeOrmModule.forFeature([Service]),
    MailModule,
  ],
  providers: [ServicesService],
  controllers: [ServiceController],
  exports: [ServicesService],
})
export class ServiceModule {}
