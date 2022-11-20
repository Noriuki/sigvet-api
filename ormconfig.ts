import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
dotenv.config();

const ORMConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: process.env.RDS_MYSQL_HOST,
  port: Number(process.env.RDS_MYSQL_PORT),
  username: process.env.RDS_MYSQL_USERNAME,
  password: process.env.RDS_MYSQL_PASSWORD,
  database: process.env.RDS_MYSQL_DATABASE,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/migrations/*{.ts,.js}'],
  cli: { migrationsDir: 'src/migrations' },
  logging: true,
  synchronize: false,
};

module.exports = ORMConfig; //Por algum motivo exportando desse jeito faz com que o CLI do typeorm reconheça as configurações
