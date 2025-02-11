import { timestamps } from '@/helpers/columns.helpers';
import { index, pgEnum, primaryKey, pgTable as table, text, uniqueIndex, uuid, varchar } from 'drizzle-orm/pg-core';

export const rolesEnum = pgEnum('roles', ['guest', 'user', 'admin']);

export const users = table(
  'users',
  {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 50 }),
    lastName: varchar('last_name', { length: 50 }),
    email: varchar().notNull(),
    role: rolesEnum().default('guest'),
    ...timestamps
  },
  (t) => [index('email_idx').on(t.email)]
);

export const posts = table(
  'posts',
  {
    id: uuid().primaryKey().defaultRandom(),
    slug: varchar(),
    title: varchar({ length: 256 }),
    authorId: uuid('author_id').references(() => users.id),
    ...timestamps
  },
  (t) => [
    {
      slugIndex: uniqueIndex('slug_idx').on(t.slug)
    },
    {
      titleIndex: index('title_idx').on(t.title)
    }
  ]
);

export const tags = table('tags', {
  id: uuid().primaryKey().defaultRandom(),
  title: varchar({ length: 75 }),
  metaTitle: varchar('meta_title', { length: 100 }),
  slug: varchar(),
  context: text(),
  ...timestamps
});

export const comments = table(
  'comments',
  {
    id: uuid().primaryKey().defaultRandom(),
    text: varchar({ length: 256 }),
    postId: uuid('post_id').references(() => posts.id),
    authorId: uuid('author_id').references(() => users.id),
    ...timestamps
  },
  (t) => [index('post_author_idx').on(t.postId, t.authorId)]
);

export const postsToTags = table(
  'posts_to_tags',
  {
    postId: uuid('post_id')
      .notNull()
      .references(() => posts.id),
    tagId: uuid('tag_id')
      .notNull()
      .references(() => tags.id)
  },
  (t) => [
    {
      pk: primaryKey({ columns: [t.postId, t.tagId] })
    }
  ]
);
