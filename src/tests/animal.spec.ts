import * as request from 'supertest';
import { AnimalDto } from '../entities/animal.entity';
import { AnimalService } from '../services/animal.service';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AnimalController } from '../controllers/animal.controller';

describe('Animal', () => {
  let app: INestApplication;

  const example1: AnimalDto = {
    name: 'Exemplo Animal 1',
    age: 10,
    birthDate: '10/10/2010',
    sex: 'M',
    castrated: true,
    fur: 'Liso',
    microchip: 'N',
    ownerId: 1,
    raceId: 1,
    size: 'Pequeno',
    speciesId: 1,
  };

  const example2: AnimalDto = {
    name: 'Exemplo Animal 2',
    age: 22,
    birthDate: '10/10/2000',
    sex: 'F',
    castrated: false,
    fur: 'Liso',
    microchip: 'N',
    ownerId: 1,
    raceId: 1,
    size: 'Pequeno',
    speciesId: 1,
  };

  const animalService = {
    getAll: () => [example1, example2],
    getOne: () => example1,
    upsert: (value: AnimalDto) => value,
    delete: (id: number) => id,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      providers: [AnimalService],
      controllers: [AnimalController],
    })
      .overrideProvider(AnimalService)
      .useValue(animalService)
      .compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  it(`/GET animal`, () => {
    return request(app.getHttpServer()).get('/animal').expect(200).expect({
      success: true,
      result: animalService.getAll(),
    });
  });

  it('/GET ONE animal', () => {
    return request(app.getHttpServer()).get('/animal/1').expect({
      success: true,
      result: animalService.getOne(),
    });
  });

  it('/POST animal', () => {
    const payload: AnimalDto = {
      name: 'Bolt',
      age: 4,
      birthDate: '2018-09-12',
      castrated: false,
      fur: 'XXX',
      microchip: 'Não',
      ownerId: 1,
      raceId: 2,
      sex: 'M',
      size: 'Pequeno',
      speciesId: 1,
    };

    return request(app.getHttpServer())
      .post('/animal')
      .send(payload)
      .expect({
        success: true,
        result: animalService.upsert(payload),
      });
  });

  it('/PUT animal', () => {
    const payload: AnimalDto = {
      name: 'Bolt',
      age: 4,
      birthDate: '2018-09-12',
      castrated: false,
      fur: 'XXX',
      microchip: 'Sim',
      ownerId: 1,
      raceId: 2,
      sex: 'M',
      size: 'Grande',
      speciesId: 1,
    };

    return request(app.getHttpServer())
      .put('/animal/1')
      .send(payload)
      .expect(200)
      .expect({
        success: true,
        message: 'Registro atualizado com sucesso!',
      });
  });

  it('/DELETE animal', () => {
    return request(app.getHttpServer()).delete('/animal/1').expect(200).expect({
      success: true,
      message: 'Registro deletado com sucesso!',
    });
  });

  afterAll(async () => {
    await app.close();
  });
});
