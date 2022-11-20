import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Species } from 'src/entities/species.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class SpeciesService extends BaseService<Species> {
  constructor(
    @InjectRepository(Species)
    private readonly speciesRepository: Repository<Species>,
  ) {
    super(speciesRepository);
  }
}
