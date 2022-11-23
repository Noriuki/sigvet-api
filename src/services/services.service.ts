import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from 'src/entities/service.entity';
import { MailService } from 'src/mail/mail.service';
import { formatPetAge } from 'src/utils/functions';
import {
  createQueryBuilder,
  DeepPartial,
  DeleteResult,
  Repository,
} from 'typeorm';
import { AppointmentService } from './appointment.service';
import { BaseService } from './base.service';
@Injectable()
export class ServicesService extends BaseService<Service> {
  constructor(
    @InjectRepository(Service)
    private readonly servicesRepository: Repository<Service>,
    private readonly appointmentService: AppointmentService,
    private mailService: MailService,
  ) {
    super(servicesRepository);
  }
  // override insert / update to add price to appointment
  async upsert(model: DeepPartial<Service>): Promise<any> {
    const appointment = await this.appointmentService.getOneDetails(
      model.appointmentId,
      model.clinicId,
    );
    const service = await this.servicesRepository.save(model);

    const updateValues = appointment?.services.reduce(
      (accumulator, currentValue) => accumulator + currentValue.price,
      appointment.base_price,
    );

    this.appointmentService.upsert({ price: updateValues });

    return service;
  }
  // override delete to remove price from appointment
  async delete(id: number): Promise<DeleteResult> {
    const model = await this.servicesRepository.findOne(id);
    const appointment = await this.appointmentService.getOne(
      model.appointmentId,
    );
    appointment.price -= model.price;
    return await this.servicesRepository.delete(id);
  }
  async getOneDetails(id: number) {
    return await this.servicesRepository.findOne({
      relations: [
        'appointment',
        'serviceType',
        'appointment.animal',
        'appointment.user',
      ],
      where: {
        id,
      },
    });
  }

  async sendToMail(id: number, recipient: string): Promise<string> {
    const serviceData = (await this.servicesRepository.findOne({
      relations: [
        'appointment',
        'serviceType',
        'appointment.animal',
        'appointment.user',
        'appointment.user.clinic',
        'appointment.animal.species',
        'appointment.animal.race',
        'appointment.animal.owner',
      ],
      where: {
        id,
      },
    })) as any;
    if (serviceData === undefined) {
      throw new HttpException('Serviço não encontrado', HttpStatus.NOT_FOUND);
    }

    const addressObj = JSON.parse(serviceData.appointment.user.clinic.address);
    const address = `
      ${addressObj?.logradouro ? addressObj?.logradouro : ''}, ${
      addressObj?.numero ? addressObj?.numero : ''
    }
      ${addressObj?.bairro ? addressObj?.bairro : ''} ${
      addressObj?.localidade ? addressObj?.localidade : ''
    }
      ${addressObj?.cep ? addressObj?.cep : ''} ${
      addressObj?.uf ? addressObj?.uf : ''
    }
      `;
    const service = {
      clinicName: serviceData?.appointment.user.clinic.name,
      clinicAddress: address,
      clinicPhone: serviceData.appointment.user.clinic.telephone,
      topic: serviceData.serviceType.name,
      name: serviceData.appointment.animal.name,
      species: serviceData.appointment.animal.species.name,
      race: serviceData.appointment.animal.race.name,
      age: formatPetAge(serviceData.appointment.animal.age),
      sex: serviceData.appointment.animal.sex,
      owner: `${serviceData.appointment.animal.owner.firstName} ${serviceData.appointment.animal.owner.lastName}`,
      appointmentId: serviceData.appointmentId,
      userName: `${serviceData.appointment.user.firstName} ${serviceData.appointment.user.lastName}`,
      crmv: serviceData.appointment.user.crmv,
      content: serviceData.notes,
    };
    await this.mailService.sendServiceMail(service, recipient);
    return 'Exame enviado para seu email!';
  }

  async getAllByAnimalId(id: number) {
    const services = await createQueryBuilder(Service, 'service')
      .leftJoinAndSelect('service.appointment', 'appointment')
      .leftJoinAndSelect('service.serviceType', 'serviceType')
      .leftJoinAndSelect('appointment.animal', 'animal')
      .leftJoinAndSelect('appointment.user', 'user')
      .where('appointment.animalId = :id', { id })
      .getRawMany();

    return services;
  }

  async getAllByUserId(id: number) {
    const services = await createQueryBuilder(Service, 'service')
      .leftJoinAndSelect('service.appointment', 'appointment')
      .leftJoinAndSelect('service.serviceType', 'serviceType')
      .leftJoinAndSelect('appointment.animal', 'animal')
      .leftJoinAndSelect('appointment.user', 'user')
      .where('appointment.userId = :id', { id })
      .getRawMany();

    return services;
  }

  async getAllByAppointmentId(id: number) {
    return await this.servicesRepository.find({
      relations: [
        'appointment',
        'serviceType',
        'appointment.animal',
        'appointment.user',
      ],
      where: {
        appointmentId: id,
      },
    });
  }
}
