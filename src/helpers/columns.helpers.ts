import { timestamp, uuid } from 'drizzle-orm/pg-core';

export const timestamps = {
  created_at: timestamp().defaultNow().notNull(),
  created_by: uuid(),
  updated_at: timestamp(),
  updated_by: uuid(),
  deleted_at: timestamp(),
  deleted_by: uuid()
};
