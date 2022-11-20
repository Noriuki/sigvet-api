import { Controller } from '@nestjs/common';
import { SpeciesDto } from 'src/entities/species.entity';
import { SpeciesService } from 'src/services/species.service';
import { CreateBaseClass } from './base.controller';

@Controller('species')
export class SpeciesController extends CreateBaseClass(SpeciesDto) {
  constructor(private readonly speciesService: SpeciesService) {
    super(speciesService);
  }
}
