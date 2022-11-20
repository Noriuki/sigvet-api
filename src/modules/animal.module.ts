import { AnimalService } from './../services/animal.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnimalController } from '../controllers/animal.controller';
import { Animal } from '../entities/animal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Animal])],
  providers: [AnimalService],
  controllers: [AnimalController],
  exports: [AnimalService],
})
export class AnimalModule {}
