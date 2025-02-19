'use server';

import { db } from '@/db/drizzle';
import { eq } from 'drizzle-orm';

import { posts } from '../db/schema';

export async function getPosts() {
  return db.select().from(posts).execute();
}

export async function getPostById(id: string) {
  return db
    .select({ id: posts.id, slug: posts.slug, title: posts.title })
    .from(posts)
    .where(eq(posts.id, id))
    .execute();
}
