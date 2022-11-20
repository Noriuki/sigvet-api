import { IsString, Length, MaxLength } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';
import { Animal } from './animal.entity';
import { Appointment } from './appointment.entity';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Owner } from './owner.entity';
import { Race } from './race.entity';
import { ServiceType } from './service-type.entity';
import { Service } from './service.entity';
import { Species } from './species.entity';
import { User } from './user.entity';

@Entity('Clinic')
export class Clinic extends BaseEntity {
  @Column({
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cnpj: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  telephone: string;

  @Column({
    type: 'varchar',
  })
  email: string;

  @OneToMany(() => User, (user) => user.id)
  user: User[];

  @OneToMany(() => Owner, (owner) => owner.id)
  owner: Owner[];

  @OneToMany(() => Animal, (animal) => animal.id)
  animals: Animal[];

  @OneToMany(() => Species, (species) => species.id)
  species: Species[];

  @OneToMany(() => Race, (race) => race.id)
  races: Race[];

  @OneToMany(() => Appointment, (appointment) => appointment.id)
  appointments: Appointment[];

  @OneToMany(() => Service, (service) => service.id)
  services: Service[];

  @OneToMany(() => ServiceType, (serviceType) => serviceType.id)
  serviceTypes: ServiceType[];
}

export class ClinicDto extends BaseDto {
  @Length(3, 100)
  name: string;

  @Length(3, 100)
  cnpj: string;

  @MaxLength(255)
  address: string;

  @Length(3, 100)
  telephone: string;

  @IsString()
  email: string;
}
