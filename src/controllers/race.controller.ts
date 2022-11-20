import { Controller } from '@nestjs/common';
import { RaceDto } from 'src/entities/race.entity';
import { RaceService } from 'src/services/race.service';
import { CreateBaseClass } from './base.controller';

@Controller('race')
export class RaceController extends CreateBaseClass(RaceDto) {
  constructor(private readonly raceService: RaceService) {
    super(raceService);
  }
}
