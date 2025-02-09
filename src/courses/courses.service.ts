import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateCourseDTO } from './dto/CreateCourse.dto';
import { UpdateCourseDTO } from './dto/UpdateCourse.dto';
import { Course } from './entities/course.entity';
import { Tag } from './entities/tag.entity';

@Injectable()
export class CoursesService {
  @InjectRepository(Course)
  private readonly courseRepository: Repository<Course>;
  @InjectRepository(Tag)
  private readonly tagsRepository: Repository<Tag>;

  async findAll() {
    return await this.courseRepository.find({
      relations: ['tags'],
    });
  }

  async findOne(id: string) {
    const course = await this.courseRepository.findOne({
      where: {
        id,
      },
      relations: ['tags'],
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return course;
  }

  async create(createCourseDTO: CreateCourseDTO) {
    const tags = await Promise.all(
      createCourseDTO.tags.map((name) => this.preloadTagByName(name)),
    );
    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });

    await this.courseRepository.save(course);

    return course;
  }

  async update(id: string, updateCourseDTO: UpdateCourseDTO) {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name)),
      ));

    const course = await this.courseRepository.preload({
      ...updateCourseDTO,
      id,
      tags,
    });

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return await this.courseRepository.save(course);
  }

  async remove(id: string) {
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

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagsRepository.findOne({
      where: {
        name,
      },
    });

    if (tag) {
      return tag;
    }

    return this.tagsRepository.create({ name });
  }
}
