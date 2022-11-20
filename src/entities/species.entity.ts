import { IsNumber, Length } from 'class-validator';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Animal } from './animal.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { Race } from './race.entity';

@Entity('Species')
export class Species extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @ManyToOne(() => Clinic, (clinic) => clinic.species)
  clinic: Clinic;

  @OneToMany(() => Race, (race) => race.species, { onUpdate: 'SET NULL' })
  race: Race[];

  @OneToMany(() => Animal, (animal) => animal.species, { onUpdate: 'SET NULL' })
  animals: Animal[];
}

export class SpeciesDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @Length(3, 100)
  name: string;
}
