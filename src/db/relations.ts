import { comments, posts, postsToTags, tags, users } from '@/db/schema';
import { relations } from 'drizzle-orm';

export const usersRelations = relations(users, ({ many }) => ({
  posts: many(posts)
}));

export const tagsRelations = relations(tags, ({ many }) => ({
  postsToTags: many(postsToTags)
}));

export const postsRelations = relations(posts, ({ one, many }) => ({
  author: one(users, {
    fields: [posts.authorId],
    references: [users.id]
  }),
  comments: many(comments),
  postsToTags: many(postsToTags)
}));

export const postsToTagsRelations = relations(postsToTags, ({ one }) => ({
  post: one(posts, {
    fields: [postsToTags.postId],
    references: [posts.id]
  }),
  tag: one(tags, {
    fields: [postsToTags.tagId],
    references: [tags.id]
  })
}));

export const commentsRelations = relations(comments, ({ one }) => ({
  post: one(posts, {
    fields: [comments.postId],
    references: [posts.id]
  })
}));
