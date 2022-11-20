import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/entities/owner.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class OwnerService extends BaseService<Owner> {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepository: Repository<Owner>,
  ) {
    super(ownerRepository);
  }
}
