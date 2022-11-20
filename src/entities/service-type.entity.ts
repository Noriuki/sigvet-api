import { IsNumber, IsString, Length } from 'class-validator';
import { ServiceCategory } from 'src/types';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { BaseDto } from './base.dto';
import { BaseEntity } from './base.entity';
import { Clinic } from './clinic.entity';
import { Service } from './service.entity';

@Entity('ServiceType')
export class ServiceType extends BaseEntity {
  @Column({
    type: 'number',
  })
  clinicId: number;

  @Column({
    type: 'varchar',
  })
  name: string;

  @Column({
    type: 'float',
  })
  defaultPrice: number;

  @Column({
    type: 'longtext',
    nullable: true,
  })
  notes?: string;

  @Column({
    type: 'varchar',
  })
  category: ServiceCategory;

  @ManyToOne(() => Clinic, (clinic) => clinic.serviceTypes)
  clinic: Clinic;

  @OneToMany(() => Service, (service) => service.serviceType, { cascade: true })
  services: Service[];
}

export class ServiceTypeDto extends BaseDto {
  @IsNumber()
  clinicId: number;

  @Length(3, 100)
  @IsString()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  defaultPrice: number;

  @IsString()
  notes?: string;

  @IsString()
  category: ServiceCategory;
}
