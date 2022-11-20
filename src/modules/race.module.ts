import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RaceController } from 'src/controllers/race.controller';
import { Race } from 'src/entities/race.entity';
import { RaceService } from 'src/services/race.service';

@Module({
  imports: [TypeOrmModule.forFeature([Race])],
  providers: [RaceService],
  controllers: [RaceController],
  exports: [RaceService],
})
export class RaceModule {}
