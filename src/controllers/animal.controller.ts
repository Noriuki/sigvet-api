import { Controller, Get, Param, Res } from '@nestjs/common';
import { AnimalDto } from '../entities/animal.entity';
import { AnimalService } from '../services/animal.service';
import { CreateBaseClass } from './base.controller';
import { Response } from 'express';
@Controller('animal')
export class AnimalController extends CreateBaseClass(AnimalDto) {
  constructor(private readonly animalService: AnimalService) {
    super(animalService);
  }

  @Get('getAllByOwnerId/:id')
  async getAllByOwnerId(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    const result = await this.animalService.getAllByOwnerId(id);
    return res.json({ success: true, result });
  }

  @Get('getall/:clinicId')
  async getAllDetails(
    @Res() res: Response,
    @Param('clinicId') clinicId: number,
  ): Promise<any> {
    const result = await this.animalService.getAllDetails(clinicId);
    return res.json({ success: true, result });
  }

  @Get('detail/:id')
  async getOneDetails(
    @Res() res: Response,
    @Param('id') id: number,
  ): Promise<any> {
    const result = await this.animalService.getOneDetails(id);
    return res.json({ success: true, result });
  }
}
