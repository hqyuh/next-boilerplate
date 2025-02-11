import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/neon-http';

const path = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production';

config({ path });

export const db = drizzle(
  // eslint-disable-next-line max-len
  `postgresql://${process.env.PGUSER}:${process.env.PGPASSWORD}@${process.env.PGHOST}/${process.env.PGDATABASE}?sslmode=require`
);
