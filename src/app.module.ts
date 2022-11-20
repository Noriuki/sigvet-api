import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as ORMConfig from './../ormconfig';
import { AuthModule } from './auth/auth.module';
import { AnimalModule } from './modules/animal.module';
import { AppointmentModule } from './modules/appointment.module';
import { ClinicModule } from './modules/clinic.module';
import { OwnerModule } from './modules/owner.module';
import { RaceModule } from './modules/race.module';
import { SeedModule } from './modules/seed.module';
import { ServiceTypeModule } from './modules/service-type.module';
import { ServiceModule } from './modules/service.module';
import { SpeciesModule } from './modules/species.module';
import { UserModule } from './modules/user.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(ORMConfig),
    ClinicModule,
    UserModule,
    RaceModule,
    SpeciesModule,
    AnimalModule,
    OwnerModule,
    AuthModule,
    ServiceTypeModule,
    ServiceModule,
    AppointmentModule,
    SeedModule,
    MailModule,
  ],
})
export class AppModule {}
