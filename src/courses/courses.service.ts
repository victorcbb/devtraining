import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Course } from './entities/course.entity';
import { CreateCourseDTO } from './dto/CreateCourse.dto';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async findAll() {
    return await this.courseRepository.find();
  }

  async findOne(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const course = this.courseRepository.create(createCourseDTO);

    await this.courseRepository.save(course);

    return course;
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return await this.courseRepository.save(course);
  }

  async remove(id: number) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return await this.courseRepository.remove(course);
  }
}
