import { Controller } from '@nestjs/common';
import { ServiceTypeDto } from '../entities/service-type.entity';
import { ServiceTypeService } from '../services/service-type.service';
import { CreateBaseClass } from './base.controller';

@Controller('servicetype')
export class ServiceTypeController extends CreateBaseClass(ServiceTypeDto) {
  constructor(private readonly serviceTypeService: ServiceTypeService) {
    super(serviceTypeService);
  }
}
