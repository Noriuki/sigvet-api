import { BaseDto } from 'src/entities/base.dto';
import { DeleteResult, FindManyOptions, FindOneOptions } from 'typeorm';

export interface IBaseService<T> {
  getAll(options?: FindManyOptions<T>): Promise<T[]>;
  getOne(id: number, options?: FindOneOptions<T>): Promise<T>;
  upsert(model: BaseDto): Promise<T>;
  bulkInsert(model: BaseDto[]): Promise<T[]>;
  delete(id: number): Promise<DeleteResult>;
}
