import { Controller } from '@nestjs/common';
import { OwnerDto } from 'src/entities/owner.entity';
import { OwnerService } from 'src/services/owner.service';
import { CreateBaseClass } from './base.controller';

@Controller('owner')
export class OwnerController extends CreateBaseClass(OwnerDto) {
  constructor(private readonly ownerService: OwnerService) {
    super(ownerService);
  }
}
