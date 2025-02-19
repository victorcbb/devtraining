import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { CoursesController } from './courses.controller';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('CoursesController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let data: any;
  let courses: Course[];

  const dataSourceOptionsTest: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [Course, Tag],
    synchronize: true,
  };

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        CoursesModule,
        TypeOrmModule.forRootAsync({
          useFactory: async () => {
            return dataSourceOptionsTest;
          },
        }),
      ],
    }).compile();

    app = module.createNestApplication();
    await app.init();

    data = {
      name: 'NestJS com TypeORM',
      description: 'Criando uma API Rest com NestJS e TypeORM',
      tags: ['nestjs', 'typeorm', 'javascript'],
    };
  });

  beforeEach(async () => {
    const dataSource = await new DataSource(dataSourceOptionsTest).initialize();
    const repository = dataSource.getRepository(Course);

    courses = await repository.find();

    await dataSource.destroy();
  });

  // it('should be defined', () => {
  //   expect(controller).toBeDefined();
  // });
});
