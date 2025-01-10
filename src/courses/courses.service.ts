import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './course.entity';

@Injectable()
export class CoursesService {
  private courses: Course[] = [
    {
      id: 1,
      name: 'Curso Nestjs',
      description: 'Curso de Nestjs',
      tags: ['Nestjs', 'Node.js', 'javascript', 'Typescript'],
    },
  ];

  findAll() {
    return this.courses;
  }

  findOne(id: number) {
    const course = this.courses.find((course) => course.id === id);

    if (!course) {
      throw new NotFoundException(`Course id: ${id} not found`);
    }

    return course;
  }

  create(createCourseDTO: any) {
    this.courses.push(createCourseDTO);
    return createCourseDTO;
  }

  update(id: number, updateCourseDTO: any) {
    const course = this.findOne(id);

    if (course) {
      const index = this.courses.findIndex((course) => course.id === id);

      this.courses[index] = {
        id,
        ...updateCourseDTO,
      };
    }
  }

  remove(id: number) {
    const index = this.courses.findIndex((course) => course.id === id);

    if (index >= 0) {
      this.courses.splice(index, 1);
    }
  }
}
