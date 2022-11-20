import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  Length,
  Max,
} from 'class-validator';
import { Roles } from 'src/types';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';

@Entity('User')
export class User extends BaseEntity {
  @Column({
    type: 'integer',
    nullable: false,
  })
  clinicId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Length(3, 100)
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  @Length(3, 100)
  lastName: string;

  @Column({
    type: 'varchar',
    nullable: false,
    unique: true,
  })
  @IsEmail()
  email: string;

  @Column({
    type: 'enum',
    enum: ['receptionist', 'doctor', 'admin'],
    nullable: false,
  })
  role: Roles;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  crmv?: string;

  @Column({
    type: 'varchar',
  })
  password_hash: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  active: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.user)
  clinic: Clinic;

  @OneToMany(() => Appointment, (appointment) => appointment.user)
  appointments: Appointment[];
}

export class UserDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @Length(3, 100)
  firstName: string;

  @Length(3, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @IsEnum(['receptionist', 'doctor', 'admin'])
  role: Roles;

  @IsOptional()
  crmv?: string;

  password?: string;

  password_hash: string;

  @IsNumber()
  @Max(1)
  active: number;
}
