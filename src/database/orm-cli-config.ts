import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';

import { AddCoursesIdToCoursesTags1737298462509 } from 'src/migrations/1737298462509-AddCoursesIdToCoursesTags';
import { AddTagsIdToCoursesTagsTable1737505909105 } from 'src/migrations/1737505909105-AddTagsIdToCoursesTagsTable';
import { CreateCoursesTable1736717556091 } from 'src/migrations/1736717556091-CreateCoursesTable';
import { CreateCoursesTagsTable1737075840103 } from 'src/migrations/1737075840103-CreateCoursesTagsTable';
import { CreateTagsTable1736815022387 } from 'src/migrations/1736815022387-CreateTagsTable';
import { Course } from 'src/courses/entities/course.entity';
import { Tag } from 'src/courses/entities/tag.entity';

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Course, Tag],
  synchronize: false,
};

export const AppDataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateCoursesTable1736717556091,
    CreateTagsTable1736815022387,
    CreateCoursesTagsTable1737075840103,
    AddCoursesIdToCoursesTags1737298462509,
    AddTagsIdToCoursesTagsTable1737505909105,
  ],
});
