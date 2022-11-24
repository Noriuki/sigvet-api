import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Animal } from '../entities/animal.entity';
import { Repository } from 'typeorm';
import { BaseService } from './base.service';

@Injectable()
export class AnimalService extends BaseService<Animal> {
  constructor(
    @InjectRepository(Animal)
    private readonly animalRepository: Repository<Animal>,
  ) {
    super(animalRepository);
  }
  async getAllDetails(clinicId: number) {
    return await this.animalRepository.find({
      relations: ['species', 'race', 'owner'],
      where: {
        clinicId,
      },
    });
  }
  async getOneDetails(id: number) {
    return await this.animalRepository.findOne({
      relations: ['species', 'race', 'owner'],
      where: {
        id,
      },
    });
  }

  async getAllByOwnerId(ownerId: number) {
    return await this.animalRepository.find({
      relations: ['species', 'race'],
      where: {
        ownerId,
      },
    });
  }
}
