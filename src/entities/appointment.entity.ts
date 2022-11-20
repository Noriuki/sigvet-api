import { IsNumber, IsString } from 'class-validator';
import { AppointmentStatus, PaymentStatus } from 'src/types';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Animal } from './animal.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { ServiceType } from './service-type.entity';
import { Service } from './service.entity';
import { User } from './user.entity';

@Entity('Appointment')
export class Appointment extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;

  @Column({
    type: 'number',
  })
  userId: number;

  @Column({
    type: 'number',
  })
  animalId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  topic: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  date: string;

  @Column({
    type: 'int',
    default: 0,
  })
  status: AppointmentStatus;

  @Column({
    type: 'int',
    default: 0,
  })
  payment_status: PaymentStatus;

  @Column({
    type: 'varchar',
    default: '',
  })
  notes: string;

  @Column({
    type: 'float',
  })
  price: number;

  @OneToMany(() => Service, (service) => service.appointment)
  @JoinTable()
  services: Service[];

  @ManyToOne(() => Clinic, (clinic) => clinic.appointments)
  clinic: Clinic;

  @ManyToOne(() => User, (user) => user.appointments)
  user: User;

  @ManyToOne(() => Animal, (animal) => animal.appointments)
  animal: Animal;
}

export class AppointmentDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @IsNumber()
  animalId: number;

  @IsNumber()
  userId: number;

  @IsString()
  topic: string;

  @IsString()
  date: string;

  status: number;

  @IsString()
  notes: string;

  @IsNumber()
  price: number;

  payment_status: number;

  services?: Service[];
}
