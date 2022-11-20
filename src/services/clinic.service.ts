import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { Animal } from 'src/entities/animal.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Clinic } from 'src/entities/clinic.entity';
import { Service } from 'src/entities/service.entity';
import { createQueryBuilder, Repository } from 'typeorm';
import { BaseService } from './base.service';

const startOfMonth = moment().startOf('month').format();
const endOfMonth = moment().endOf('month').format();

const startPastMonth = moment().subtract(1, 'month').startOf('month').format();
const endPastMonth = moment().subtract(1, 'month').endOf('month').format();

const startOfYear = moment().startOf('year').format();
const endOfYear = moment().endOf('year').format();
@Injectable()
export class ClinicService extends BaseService<Clinic> {
  constructor(
    @InjectRepository(Clinic)
    private readonly clinicRepository: Repository<Clinic>,
  ) {
    super(clinicRepository);
  }

  async getHomeDashboard(clinicId: number): Promise<any> {
    const { animalsOfMonth } = await createQueryBuilder(Animal, 'animal')
      .select(['COUNT(animal.id) as animalsOfMonth'])
      .where(`animal.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`)
      .andWhere('animal.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const { animalsPastMonth } = await createQueryBuilder(Animal, 'animal')
      .select(['COUNT(animal.id) as animalsPastMonth'])
      .where(
        `animal.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .andWhere('animal.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const { appointmentsOfMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['COUNT(appointment.id) as appointmentsOfMonth'])
      .where(
        `appointment.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`,
      )
      .andWhere('appointment.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const { appointmentsPastMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['COUNT(appointment.id) as appointmentsPastMonth'])
      .where(
        `appointment.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .andWhere('appointment.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const { servicesOfMonth } = await createQueryBuilder(Service, 'service')
      .select(['COUNT(service.id) as servicesOfMonth'])
      .where(`service.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`)
      .andWhere('service.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const { servicesPastMonth } = await createQueryBuilder(Service, 'service')
      .select(['COUNT(service.id) as servicesPastMonth'])
      .where(
        `service.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .andWhere('service.clinicId = :clinicId', { clinicId })
      .getRawOne();

    const appointmentsOfYear = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select([
        'Month(appointment.created_at) as month, COUNT(appointment.id) as appointment_count',
      ])
      .groupBy('Month(appointment.created_at)')
      .where(
        `appointment.created_at BETWEEN '${startOfYear}' AND '${endOfYear}'`,
      )
      .andWhere('appointment.clinicId = :clinicId', { clinicId })
      .getRawMany();

    return {
      appointmentsOfMonth,
      appointmentPercentage: await this.getPercentageValue(
        appointmentsOfMonth,
        appointmentsPastMonth,
      ),
      animalsOfMonth,
      animalsPercentage: await this.getPercentageValue(
        animalsOfMonth,
        animalsPastMonth,
      ),
      servicesOfMonth,
      servicePercentage: await this.getPercentageValue(
        servicesOfMonth,
        servicesPastMonth,
      ),
      appointmentsOfYear,
    };
  }

  async getPercentageValue(actual: number, old: number) {
    actual = Number(actual);
    old = Number(old);
    if (old === 0) return 0;
    return Math.floor(((actual - old) / old) * 100);
  }

  async getFinanceDashboard(id: number): Promise<any> {
    const { totalRevenueOfMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['SUM(appointment.price) as totalRevenueOfMonth'])
      .where('appointment.clinicId = :id', { id })
      .andWhere(
        `appointment.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`,
      )
      .getRawOne();

    const { totalRevenueOfPastMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['SUM(appointment.price) as totalRevenueOfPastMonth'])
      .where('appointment.clinicId = :id', { id })
      .andWhere(
        `appointment.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .getRawOne();

    const { averageAppointmentPriceOfMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['AVG(appointment.price) as averageAppointmentPriceOfMonth'])
      .where('appointment.clinicId = :id', { id })
      .andWhere(
        `appointment.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`,
      )
      .getRawOne();

    const { averageAppointmentPriceOfPastMonth } = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select(['AVG(appointment.price) as averageAppointmentPriceOfPastMonth'])
      .where('appointment.clinicId = :id', { id })
      .andWhere(
        `appointment.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .getRawOne();

    const { averageServicePriceOfMonth } = await createQueryBuilder(
      Service,
      'service',
    )
      .select(['AVG(service.price) as averageServicePriceOfMonth'])
      .where('service.clinicId = :id', { id })
      .andWhere(
        `service.created_at BETWEEN '${startOfMonth}' AND '${endOfMonth}'`,
      )
      .getRawOne();

    const { averageServicePriceOfPastMonth } = await createQueryBuilder(
      Service,
      'service',
    )
      .select(['AVG(service.price) as averageServicePriceOfPastMonth'])
      .where('service.clinicId = :id', { id })
      .andWhere(
        `service.created_at BETWEEN '${startPastMonth}' AND '${endPastMonth}'`,
      )
      .getRawOne();

    const averageRevenueOfYear = await createQueryBuilder(
      Appointment,
      'appointment',
    )
      .select([
        'Month(appointment.created_at) as month, SUM(appointment.price) as total',
      ])
      .where('appointment.clinicId = :id', { id })
      .andWhere(
        `appointment.created_at BETWEEN '${startOfYear}' AND '${endOfYear}'`,
      )
      .groupBy('Month(appointment.created_at)')
      .getRawMany();

    return {
      totalRevenueOfMonth: totalRevenueOfMonth?.toFixed(2) || 0,
      totalRevenuePercentage: await this.getPercentageValue(
        totalRevenueOfMonth,
        totalRevenueOfPastMonth,
      ),
      averageAppointmentPriceOfMonth:
        averageAppointmentPriceOfMonth?.toFixed(2) || 0,
      averageAppointmentPercentage: await this.getPercentageValue(
        averageAppointmentPriceOfMonth,
        averageAppointmentPriceOfPastMonth,
      ),
      averageServicePriceOfMonth: averageServicePriceOfMonth?.toFixed(2) || 0,
      averageServicePercentage: await this.getPercentageValue(
        averageServicePriceOfMonth,
        averageServicePriceOfPastMonth,
      ),
      averageRevenueOfYear,
    };
  }
}
