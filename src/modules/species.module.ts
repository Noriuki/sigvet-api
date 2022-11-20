import { SpeciesService } from './../services/species.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpeciesController } from 'src/controllers/species.controller';
import { Species } from 'src/entities/species.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Species])],
  providers: [SpeciesService],
  controllers: [SpeciesController],
  exports: [SpeciesService],
})
export class SpeciesModule {}
