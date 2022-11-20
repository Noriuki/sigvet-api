import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendPasswordReset(user: User, newPassword: string) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Reset de senha',
      template: 'password-reset',
      context: {
        firstName: user.firstName,
        lastName: user.lastName,
        newPassword: newPassword,
      },
    });
  }

  async sendServiceMail(service: any, recipient: string) {
    await this.mailerService.sendMail({
      to: recipient,
      subject: 'Relatório de serviço',
      template: 'service',
      context: {
        clinicName: service.clinicName,
        clinicAddress: service.clinicAddress,
        clinicPhone: service.clinicPhone,
        topic: service.topic,
        name: service.name,
        species: service.species,
        race: service.race,
        age: service.age,
        sex: service.sex,
        owner: service.owner,
        appointmentId: service.appointmentId,
        userName: service.userName,
        crmv: service.crmv,
        content: service.content,
      },
    });
  }
}
