import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { AnimalSex } from 'src/types';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Appointment } from './appointment.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { Owner } from './owner.entity';
import { Race } from './race.entity';
import { Species } from './species.entity';

@Entity('Animal')
export class Animal extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'enum',
    enum: ['M', 'F'],
    nullable: false,
  })
  sex: AnimalSex;

  @Column({
    type: 'int',
    nullable: false,
  })
  castrated: number;

  @Column({
    type: 'float',
    nullable: false,
  })
  age: number;

  @Column({
    type: 'date',
    nullable: true,
  })
  birthDate: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  fur: string;

  @Column({
    type: 'enum',
    enum: ['small', 'medium', 'large'],
    nullable: false,
  })
  size: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  raceId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  speciesId: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  ownerId: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.animals)
  clinic: Clinic;

  @ManyToOne(() => Race, (race) => race.animals)
  race: Race;

  @ManyToOne(() => Species, (species) => species.animals)
  species: Species;

  @ManyToOne(() => Owner, (owner) => owner.animals)
  owner: Owner;

  @OneToMany(() => Appointment, (exam) => exam.animal)
  appointments: Appointment[];
}

export class AnimalDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @Length(3, 100)
  name: string;

  @IsEnum(['M', 'F'])
  sex: AnimalSex;

  @IsNumber()
  @Max(1)
  castrated: number;

  @Max(99)
  age: number;

  @IsDateString()
  birthDate: string;

  @IsString()
  fur: string;

  @IsEnum(['small', 'medium', 'large'])
  size: string;

  @IsNumber()
  @Min(1)
  raceId: number;

  @IsNumber()
  @Min(1)
  speciesId: number;

  @IsNumber()
  @Min(1)
  ownerId: number;
}
