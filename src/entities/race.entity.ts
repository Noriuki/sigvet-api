import { IsInt, IsNumber, Length } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Animal } from './animal.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { Species } from './species.entity';

@Entity('Races')
export class Race extends BaseEntity {
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
    type: 'int',
  })
  speciesId: number;

  @ManyToOne(() => Clinic, (clinic) => clinic.races)
  clinic: Clinic;

  @ManyToOne(() => Species, (species) => species.race)
  species: Species;

  @ManyToOne(() => Animal, (animal) => animal.race)
  animals: Animal[];
}

export class RaceDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @Length(3, 100)
  name: string;

  @IsInt()
  speciesId: number;
}
