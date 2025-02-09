import { Repository } from 'typeorm';
import { CoursesService } from './courses.service';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';
import { randomUUID } from 'node:crypto';
import { CreateCourseDTO } from './dto/CreateCourse.dto';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';

describe('CoursesService unite tests', () => {
  let service: CoursesService;

  let id: string;
  let created_at: Date;
  let expectOutputTags: { id: string; name: string; created_at: Date }[];
  let expectOutputCourses: {
    id: string;
    name: string;
    description: string;
    created_at: Date;
    tags: { id: string; name: string; created_at: Date }[];
  };
  let mockCoursesRepository: any;
  let mockTagsRepository: any;

  beforeEach(async () => {
    service = new CoursesService();
    id = randomUUID();
    created_at = new Date();
    expectOutputTags = [
      {
        id,
        name: 'Nestjs',
        created_at,
      },
    ];

    expectOutputCourses = {
      created_at,
      description: 'Curso de Nestjs',
      id,
      name: 'Nestjs descomplicado',
      tags: expectOutputTags,
    };

    mockCoursesRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      save: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      update: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      preload: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findAll: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      find: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      findOne: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
      remove: jest.fn().mockReturnValue(Promise.resolve(expectOutputCourses)),
    };

    mockTagsRepository = {
      create: jest.fn().mockReturnValue(Promise.resolve(expectOutputTags)),
      findOne: jest.fn(),
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be create a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    // @ts-expect-error defined part of methods
    service['tagsRepository'] = mockTagsRepository;

    const createCourseDTO: CreateCourseDTO = {
      description: 'Curso de Nestjs',
      name: 'Nestjs descomplicado',
      tags: ['Nestjs'],
    };

    const newCourse = await service.create(createCourseDTO);

    expect(mockCoursesRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(newCourse);
  });

  it('should list all courses', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    // @ts-expect-error defined part of methods
    service['tagsRepository'] = mockTagsRepository;

    const courses = await service.findAll();

    expect(mockCoursesRepository.find).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(courses);
  });

  it('should gets a courses by id', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    // @ts-expect-error defined part of methods
    service['tagsRepository'] = mockTagsRepository;

    const course = await service.findOne(id);

    expect(mockCoursesRepository.findOne).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should be update a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    // @ts-expect-error defined part of methods
    service['tagsRepository'] = mockTagsRepository;

    const updateCourseDTO: UpdateCourseDTO = {
      description: 'Curso de Nestjs',
      name: 'Nestjs descomplicado',
      tags: ['Nestjs'],
    };

    const course = await service.update(id, updateCourseDTO);

    expect(mockCoursesRepository.preload).toHaveBeenCalled();
    expect(mockCoursesRepository.save).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });

  it('should be able to remove a course', async () => {
    // @ts-expect-error defined part of methods
    service['courseRepository'] = mockCoursesRepository;
    // @ts-expect-error defined part of methods
    service['tagsRepository'] = mockTagsRepository;

    const course = await service.remove(id);

    expect(mockCoursesRepository.findOne).toHaveBeenCalled();
    expect(mockCoursesRepository.remove).toHaveBeenCalled();
    expect(expectOutputCourses).toStrictEqual(course);
  });
});
