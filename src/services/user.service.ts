import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { passwordHash } from 'src/auth/auth.service';
import { User } from 'src/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private mailService: MailService,
  ) {
    super(userRepository);
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      email: email,
      active: 1,
    });
    if (user === undefined) {
      throw new HttpException(
        'Usuário não encontrado ou inativo!',
        HttpStatus.NOT_FOUND,
      );
    }

    return user;
  }
  async passwordReset(email: string): Promise<string> {
    const user = await this.userRepository.findOne({
      email: email,
      active: 1,
    });

    if (user === undefined) {
      throw new HttpException(
        'Usuário não encontrado ou inativo!',
        HttpStatus.NOT_FOUND,
      );
    }
    // lógica de reset de senha aqui
    const newPassword = Math.random().toString(36).slice(2);
    const password_hash = await passwordHash(newPassword);
    await this.userRepository.save({ ...user, password_hash });
    await this.mailService.sendPasswordReset(user, newPassword);
    return 'Email de reset enviado!';
  }

  async getActiveUsers(clinicId: number): Promise<User[]> {
    const activeUsers = await this.userRepository.find({
      clinicId: clinicId,
      active: 1,
    });
    return activeUsers;
  }
}
