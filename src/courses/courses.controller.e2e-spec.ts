import 'dotenv/config';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Course } from './entities/course.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { Tag } from './entities/tag.entity';
import { CoursesModule } from './courses.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import request from 'supertest';

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

  afterAll(async () => {
    await module.close();
  });

  describe('POST /courses', () => {
    it('should be create a course', async () => {
      const response = await request(app.getHttpServer())
        .post('/courses')
        .send(data)
        .expect(201);

      expect(response.body.id).toBeDefined();
      expect(response.body.name).toEqual(data.name);
      expect(response.body.description).toEqual(data.description);
      expect(response.body.created_at).toBeDefined();
      expect(response.body.tags[0].name).toEqual(data.tags[0]);
      expect(response.body.tags[1].name).toEqual(data.tags[1]);
    });
  });

  describe('GET /courses', () => {
    it('should be list all courses', async () => {
      const response = await request(app.getHttpServer())
        .get('/courses')
        .expect(200);

      expect(response.body[0].id).toBeDefined();
      expect(response.body[0].name).toEqual(data.name);
      expect(response.body[0].description).toEqual(data.description);
      expect(response.body[0].created_at).toBeDefined();

      response.body.map((course) =>
        expect(course).toEqual({
          id: course.id,
          name: course.name,
          description: course.description,
          created_at: course.created_at,
          tags: [...course.tags],
        }),
      );
    });
  });

  describe('GET /courses/:id', () => {
    it('should gets a course by id', async () => {
      const response = await request(app.getHttpServer())
        .get(`/courses/${courses[0].id}`)
        .expect(200);

      expect(response.body.id).toEqual(courses[0].id);
      expect(response.body.name).toEqual(courses[0].name);
      expect(response.body.description).toEqual(courses[0].description);
    });
  });

  describe('PUT /courses/:id', () => {
    it('should update a course', async () => {
      const updateData = {
        name: 'New Name',
        description: 'New Description',
        tags: ['one', 'two'],
      };

      const response = await request(app.getHttpServer())
        .put(`/courses/${courses[0].id}`)
        .send(updateData)
        .expect(200);

      expect(response.body.id).toEqual(courses[0].id);
      expect(response.body.name).toEqual('New Name');
      expect(response.body.description).toEqual('New Description');
      expect(response.body.tags).toHaveLength(2);
      expect(response.body.tags[0].name).toEqual('one');
      expect(response.body.tags[1].name).toEqual('two');
    });
  });

  describe('DELETE /courses/:id', () => {
    it('should delete a course', async () => {
      await request(app.getHttpServer())
        .delete(`/courses/${courses[0].id}`)
        .expect(204)
        .expect({});
    });
  });
});
