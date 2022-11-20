import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/entities/appointment.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class AppointmentService extends BaseService<Appointment> {
  constructor(
    @InjectRepository(Appointment)
    private readonly appointmentRepository: Repository<Appointment>,
  ) {
    super(appointmentRepository);
  }

  async getAppointmentHistory(id: number): Promise<any> {
    const history = await this.appointmentRepository.find({
      relations: ['services'],
      where: {
        id,
      },
    });

    return history;
  }

  async getAllByOwnerId(ownerId: number) {
    const appointments = await this.appointmentRepository.find({
      relations: ['animal'],
      where: {
        animal: {
          ownerId,
        },
      },
    });

    return appointments;
  }

  async getAllByAnimalId(animalId: number) {
    return await this.appointmentRepository.find({
      where: {
        animalId,
      },
    });
  }

  async getOneDetails(id: number, clinicId: number) {
    return await this.appointmentRepository.findOne({
      relations: ['animal', 'animal.species', 'animal.race', 'user'],
      where: {
        id,
        clinicId,
      },
    });
  }

  async getAllByUserId(userId: number) {
    return await this.appointmentRepository.find({
      where: {
        userId,
      },
    });
  }
}
