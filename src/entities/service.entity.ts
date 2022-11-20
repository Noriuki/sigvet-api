import { Appointment } from 'src/entities/appointment.entity';
import { IsDateString, IsNumber, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { ServiceType } from './service-type.entity';
import { AppointmentStatus } from 'src/types';

@Entity('Service')
export class Service extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;

  @Column({
    type: 'integer',
  })
  serviceTypeId: number;

  @Column({
    type: 'integer',
  })
  appointmentId: number;

  @Column({
    type: 'varchar',
  })
  status: AppointmentStatus;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  notes?: string;

  @Column({
    type: 'datetime',
  })
  date: string;

  @Column({
    type: 'float',
  })
  price: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.services)
  clinic: Clinic;

  @ManyToOne(() => ServiceType, (serviceType) => serviceType.services)
  serviceType: ServiceType;

  @ManyToOne(() => Appointment, (appointment) => appointment.services, {
    eager: true,
  })
  appointment: Appointment;
}

export class ServiceDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @IsNumber()
  serviceTypeId: number;

  @IsNumber()
  appointmentId: number;

  @IsString()
  notes?: string;

  @IsDateString()
  date: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  status: AppointmentStatus;
}
