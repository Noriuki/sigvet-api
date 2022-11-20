import { Optional } from '@nestjs/common';
import { IsNumber, IsString, Length, MaxLength } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Animal } from './animal.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';

@Entity('Owner')
export class Owner extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;
  @Column({
    type: 'varchar',
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  lastName: string;

  @Column({
    type: 'varchar',
    unique: true,
    nullable: false,
  })
  cpf: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  telephone: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cellphone: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.owner)
  clinic: Clinic;

  @OneToMany(() => Animal, (animal) => animal.owner, { onDelete: 'CASCADE' })
  animals: Animal[];
}

export class OwnerDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @IsString()
  @Length(3, 100)
  firstName: string;

  @IsString()
  @Length(3, 100)
  lastName: string;

  @Length(14)
  cpf: string;

  @MaxLength(255)
  address: string;

  @Optional()
  email: string;

  @Optional()
  telephone?: string;

  @Length(15)
  cellphone: string;
}
