import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceType } from '../entities/service-type.entity';
import { BaseService } from './base.service';

@Injectable()
export class ServiceTypeService extends BaseService<ServiceType> {
  constructor(
    @InjectRepository(ServiceType)
    private readonly serviceTypeRepository: Repository<ServiceType>,
  ) {
    super(serviceTypeRepository);
  }
}
