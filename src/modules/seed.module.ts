import { SeedService } from './../services/seed.service';
import { Module } from '@nestjs/common';
import { ClinicModule } from './clinic.module';
import { UserModule } from './user.module';
import { OwnerModule } from './owner.module';
import { RaceModule } from './race.module';
import { SpeciesModule } from './species.module';
import { AnimalModule } from './animal.module';
import { AppointmentModule } from './appointment.module';
import { ServiceTypeModule } from './service-type.module';
import { ServiceModule } from './service.module';

@Module({
  imports: [
    ClinicModule,
    UserModule,
    OwnerModule,
    RaceModule,
    SpeciesModule,
    AnimalModule,
    AppointmentModule,
    ServiceTypeModule,
    ServiceModule,
  ],
  providers: [SeedService],
})
export class SeedModule {}
