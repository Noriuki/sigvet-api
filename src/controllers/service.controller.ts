import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ServiceDto } from 'src/entities/service.entity';
import { ServicesService } from 'src/services/services.service';
import { CreateBaseClass } from './base.controller';

@Controller('service')
export class ServiceController extends CreateBaseClass(ServiceDto) {
  constructor(private readonly servicesService: ServicesService) {
    super(servicesService);
  }

  @Get('detail/:id')
  async getOneDetails(@Res() res: Response, @Param('id') id: number) {
    const result = await this.servicesService.getOneDetails(id);

    return res.json({ success: true, result });
  }

  @Post('/mail')
  async sendToMail(@Body() body: any, @Res() res: Response): Promise<any> {
    const result = await this.servicesService.sendToMail(body.id, body.email);
    return res.json({ success: true, result });
  }

  @Get('getAllByAnimalId/:id')
  async getAllByAnimalId(@Param('id') id: number) {
    return await this.servicesService.getAllByAnimalId(id);
  }

  @Get('getAllByUserId/:id')
  async getAllByUserId(@Param('id') id: number) {
    return await this.servicesService.getAllByUserId(id);
  }

  @Get('getAllByAppointmentId/:id')
  async getAllByAppointmentId(@Param('id') id: number) {
    return await this.servicesService.getAllByAppointmentId(id);
  }
}
