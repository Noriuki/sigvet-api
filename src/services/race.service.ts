import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Race } from 'src/entities/race.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class RaceService extends BaseService<Race> {
  constructor(
    @InjectRepository(Race)
    private readonly raceRepository: Repository<Race>,
  ) {
    super(raceRepository);
  }
}
