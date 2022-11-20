import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { Animal } from 'src/entities/animal.entity';
import { Appointment } from 'src/entities/appointment.entity';
import { Owner } from 'src/entities/owner.entity';
import { Race } from 'src/entities/race.entity';
import { ServiceType } from 'src/entities/service-type.entity';
import { Service } from 'src/entities/service.entity';
import { Species } from 'src/entities/species.entity';
import { passwordHash } from '../auth/auth.service';
import { Clinic } from '../entities/clinic.entity';
import { User } from '../entities/user.entity';
import {
  AppointmentStatus,
  PaymentStatus,
  Roles,
  ServiceCategory,
} from '../types';
import { AnimalService } from './animal.service';
import { AppointmentService } from './appointment.service';
import { ClinicService } from './clinic.service';
import { OwnerService } from './owner.service';
import { RaceService } from './race.service';
import { ServiceTypeService } from './service-type.service';
import { ServicesService } from './services.service';
import { SpeciesService } from './species.service';
import { UserService } from './user.service';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    private readonly clinicService: ClinicService,
    private readonly userService: UserService,
    private readonly ownerService: OwnerService,
    private readonly raceService: RaceService,
    private readonly speciesService: SpeciesService,
    private readonly animalService: AnimalService,
    private readonly appointmentService: AppointmentService,
    private readonly serviceTypeService: ServiceTypeService,
    private readonly servicesService: ServicesService,
  ) {}

  async onApplicationBootstrap() {
    const logger = new Logger('Seeding');
    logger.log('--- Seed Service: Check ---');

    const clinic = await this.clinicSeeder();
    await this.userSeeder(clinic.id);
    await this.animalSeeder(clinic.id);
    await this.appointmentSeeder(clinic.id);

    logger.log('--- Seed Service: End ---');
  }

  async clinicSeeder() {
    const clinicList = await this.clinicService.getAll();

    if (clinicList.length < 1) {
      const clinic = new Clinic();

      clinic.name = 'CAVET';
      clinic.email = 'clinica@cavet.com';
      const ownerAddress = {
        cep: '18230-000',
        logradouro: 'Teste',
        bairro: 'Centro',
        localidade: 'São Miguel Arcanjo',
        uf: 'SP',
      };

      clinic.address = JSON.stringify(ownerAddress);
      clinic.cnpj = '10.000.000/0001-20';
      clinic.telephone = '(15) 3223-1567';

      clinic.id = (await this.clinicService.upsert(clinic)).id;

      return clinic;
    }

    return clinicList[0];
  }

  async userSeeder(clinicId: number) {
    const userList = await this.userService.getAll({
      where: { clinicId },
    });

    if (userList.length < 1) {
      const admin = new User();
      admin.clinicId = clinicId;
      admin.firstName = 'Jon';
      admin.lastName = 'Doe';
      admin.email = 'adm@cavet.com';
      admin.role = Roles.admin;
      admin.crmv = '';
      admin.password_hash = await passwordHash('123123');
      admin.active = 1;

      const receptionist = new User();
      receptionist.clinicId = clinicId;
      receptionist.firstName = 'Lívia';
      receptionist.lastName = 'Alícia Galvão';
      receptionist.email = 'atendimento@cavet.com';
      receptionist.role = Roles.receptionist;
      receptionist.crmv = '';
      receptionist.password_hash = await passwordHash('123123');
      receptionist.active = 1;

      const doctor = new User();
      doctor.clinicId = clinicId;
      doctor.firstName = 'Guilherme';
      doctor.lastName = 'Lima';
      doctor.email = 'guilherme_lima@cavet.com';
      doctor.role = Roles.doctor;
      doctor.crmv = '';
      doctor.password_hash = await passwordHash('123123');
      doctor.active = 1;

      await this.userService.upsert(admin);
      await this.userService.upsert(receptionist);
      await this.userService.upsert(doctor);
    }
  }

  async animalSeeder(clinicId: number) {
    const animalList = await this.animalService.getAll({
      where: {
        clinicId,
      },
    });

    if (animalList.length < 1) {
      const owner = new Owner();
      owner.firstName = 'Matheus';
      owner.lastName = 'Costa';
      owner.clinicId = clinicId;
      owner.cpf = '905.941.420-91';
      owner.address = 'Rua teste, 999 - Sorocaba - 909';
      owner.email = 'matheus_costa@gmail.com';
      owner.cellphone = '(15) 99133-1231';

      await this.ownerService.upsert(owner);

      const canina = new Species();
      canina.name = 'Canina';
      canina.clinicId = clinicId;

      await this.speciesService.upsert(canina);

      const felina = new Species();
      felina.name = 'Felina';
      felina.clinicId = clinicId;

      await this.speciesService.upsert(felina);

      const raceCanina = new Race();
      raceCanina.name = 'R.N.D';
      raceCanina.clinicId = clinicId;
      raceCanina.species = canina;

      await this.raceService.upsert(raceCanina);

      const raceFelina = new Race();
      raceFelina.name = 'R.N.D';
      raceFelina.clinicId = clinicId;
      raceFelina.species = canina;

      await this.raceService.upsert(raceFelina);

      const animal = new Animal();
      animal.name = 'Bolt';
      animal.birthDate = '2020-10-10';
      animal.fur = 'Listrado';
      animal.sex = 'M';
      animal.castrated = 0;
      animal.size = 'small';
      animal.age = 1;
      animal.clinicId = clinicId;
      animal.species = canina;
      animal.race = raceCanina;
      animal.owner = owner;

      await this.animalService.upsert(animal);
    }
  }

  async appointmentSeeder(clinicId: number) {
    const appointmentList = await this.appointmentService.getAll({
      where: {
        clinicId,
      },
    });

    if (appointmentList.length < 1) {
      const user = await this.userService.getAll({
        where: { clinicId },
      });

      const animal = await this.animalService.getAll({
        where: {
          clinicId,
        },
      });

      const serviceType = new ServiceType();

      serviceType.name = 'Hemograma';
      serviceType.clinicId = clinicId;
      serviceType.defaultPrice = 22.99;
      serviceType.category = ServiceCategory[
        ServiceCategory.Cirurgy
      ] as unknown as ServiceCategory;
      serviceType.notes = 'Procedimento: Precisa de X insumos<br>Resultados:';

      const serviceType2 = new ServiceType();

      serviceType2.name = 'Banho';
      serviceType2.clinicId = clinicId;
      serviceType2.defaultPrice = 30.99;
      serviceType2.category = ServiceCategory[
        ServiceCategory.Petshop
      ] as unknown as ServiceCategory;
      serviceType2.notes =
        'Aplicado shampoo e outros produtos para a limpeza do pelo';

      await this.serviceTypeService.bulkInsert([serviceType, serviceType2]);

      const appointment = new Appointment();

      appointment.topic = 'Checkup';
      appointment.date = '2022-10-19';
      appointment.status = AppointmentStatus.open;
      appointment.payment_status = PaymentStatus.open;
      appointment.price = 100.0;
      appointment.animal = animal[0];
      appointment.user = user[0];
      appointment.clinicId = clinicId;

      const appointmentId = (await this.appointmentService.upsert(appointment))
        .id;

      const service = new Service();
      service.price = 20.99;

      service.appointmentId = appointmentId;
      service.status = AppointmentStatus.open;
      service.notes = 'Descontinho de R$ 2,00';
      service.clinicId = clinicId;
      service.serviceType = serviceType;
      service.date = '2022-10-19';

      const service2 = new Service();
      service2.price = 30.99;
      service.appointment = appointment;
      service2.clinicId = clinicId;
      service.status = AppointmentStatus.open;
      service2.serviceType = serviceType;
      service2.date = '2022-10-19';

      await this.servicesService.bulkInsert([service, service2]);
    }
  }
}
