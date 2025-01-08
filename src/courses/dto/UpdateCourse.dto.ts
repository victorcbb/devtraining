import { PartialType } from '@nestjs/mapped-types';
import { CreateCourseDTO } from './CreateCourse.dto';

export class UpdateCourseDTO extends PartialType(CreateCourseDTO) {}
