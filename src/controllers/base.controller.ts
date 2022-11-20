import {
  Body,
  Delete,
  Get,
  Param,
  Paramtype,
  ParseIntPipe,
  Post,
  Put,
  Res,
  Type,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDto } from '../entities/base.dto';
import { IBaseService } from '../services/IBaseService';

export function CreateBaseClass<D extends BaseDto>(DtoRef: Type<D>): Type<any> {
  class BaseController<T> {
    constructor(private readonly baseService: IBaseService<T>) {}

    protected readonly validationPipe: ValidationPipe = new ValidationPipe();

    protected transform(dto: D, type: Paramtype = 'body') {
      return this.validationPipe.transform(dto, {
        type,
        metatype: DtoRef,
      });
    }

    @Get(':id')
    async getOne(
      @Res() res: Response,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
      const result = await this.baseService.getOne(id);

      if (!result)
        return res
          .status(400)
          .json({ success: false, message: 'Registro não encontrado!' });

      return res.json({ success: true, result });
    }

    @Get('all/:clinicId')
    async getAll(
      @Res() res: Response,
      @Param('clinicId', ParseIntPipe) clinicId: number,
    ): Promise<any> {
      const result = await this.baseService.getAll({ where: { clinicId } });

      return res.json({ success: true, result });
    }

    @Post()
    async insert(@Res() res: Response, @Body() model: D): Promise<any> {
      await this.transform(model);

      const result = await this.baseService.upsert(model);

      return res.status(201).json({ success: true, result });
    }

    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Res() res: Response,
      @Body() model: D,
    ): Promise<any> {
      model.id = id;

      await this.transform(model);
      await this.baseService.upsert(model);

      return res.json({
        success: true,
        message: 'Registro atualizado com sucesso!',
      });
    }

    @Delete(':id')
    async delete(
      @Res() res: Response,
      @Param('id', ParseIntPipe) id: number,
    ): Promise<any> {
      const result: number = (await this.baseService.delete(id))?.affected;

      if (result < 1)
        return res.status(400).json({
          success: false,
          message: 'Nenhum registro deletado!',
        });

      return res.json({
        success: true,
        message: 'Registro deletado com sucesso!',
      });
    }
  }

  return BaseController;
}
