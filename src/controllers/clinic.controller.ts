import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClinicDto } from 'src/entities/clinic.entity';
import { ClinicService } from 'src/services/clinic.service';
import { CreateBaseClass } from './base.controller';

@Controller('clinic')
export class ClinicController extends CreateBaseClass(ClinicDto) {
  constructor(private readonly clinicService: ClinicService) {
    super(clinicService);
  }

  @Get('/dash/home/:id')
  async getHomeDashboard(
    @Res() res: Response,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const result = await this.clinicService.getHomeDashboard(id);
    return res.status(201).json({ success: true, result });
  }

  @Get('/dash/finance/:id')
  async login(@Res() res: Response, @Param('id', ParseIntPipe) id: number) {
    const result = await this.clinicService.getFinanceDashboard(id);
    return res.status(201).json({ success: true, result });
  }
}
