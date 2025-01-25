import { DataSource } from 'typeorm';

import { dataSourceOptions } from './database.module';
import { AddCoursesIdToCoursesTags1737298462509 } from 'src/migrations/1737298462509-AddCoursesIdToCoursesTags';
import { AddTagsIdToCoursesTagsTable1737505909105 } from 'src/migrations/1737505909105-AddTagsIdToCoursesTagsTable';
import { CreateCoursesTable1736717556091 } from 'src/migrations/1736717556091-CreateCoursesTable';
import { CreateCoursesTagsTable1737075840103 } from 'src/migrations/1737075840103-CreateCoursesTagsTable';
import { CreateTagsTable1736815022387 } from 'src/migrations/1736815022387-CreateTagsTable';

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
