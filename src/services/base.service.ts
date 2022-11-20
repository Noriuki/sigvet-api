import { DeepPartial, DeleteResult, FindOneOptions, Repository } from 'typeorm';
import { IBaseService } from './IBaseService';

export class BaseService<T> implements IBaseService<T> {
  constructor(private readonly baseRepository: Repository<T>) {}

  async getAll(options?: FindOneOptions<T>): Promise<T[]> {
    return await this.baseRepository.find({
      ...options,
    });
  }

  async getOne(id: number, options?: FindOneOptions<T>): Promise<T> {
    return await this.baseRepository.findOne(id, options);
  }

  async upsert(model: DeepPartial<T>): Promise<T> {
    return await this.baseRepository.save(model);
  }

  async bulkInsert(model: DeepPartial<T[]>): Promise<T[]> {
    return await this.baseRepository.save(model);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.baseRepository.delete(id);
  }
}
