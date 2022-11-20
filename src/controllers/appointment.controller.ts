import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppointmentDto } from 'src/entities/appointment.entity';
import { AppointmentService } from 'src/services/appointment.service';
import { CreateBaseClass } from './base.controller';
@Controller('appointment')
export class AppointmentController extends CreateBaseClass(AppointmentDto) {
  constructor(private readonly appointmentService: AppointmentService) {
    super(appointmentService);
  }

  @Get('getAllByOwnerId/:id')
  async getAllByOwnerId(@Param('id') id: number) {
    return await this.appointmentService.getAllByOwnerId(id);
  }

  @Get('getAllByAnimalId/:id')
  async getAllByAnimalId(@Param('id') id: number) {
    return await this.appointmentService.getAllByAnimalId(id);
  }

  @Get('getHistoryById/:id')
  async getHistoryById(@Param('id') id: number) {
    return await this.appointmentService.getAppointmentHistory(id);
  }

  @Get('getAllByUserId/:id')
  async getAllByUserId(@Param('id') id: number) {
    return await this.appointmentService.getAllByUserId(id);
  }
  @Get('detail/:id/:clinicId')
  async getOneDetails(
    @Res() res: Response,
    @Param('id') id: number,
    @Param('clinicId') clinicId: number,
  ) {
    const result = await this.appointmentService.getOneDetails(id, clinicId);
    return res.json({ success: true, result });
  }
}
