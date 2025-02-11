import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

const path = process.env.NODE_ENV === 'development' ? '.env.development' : '.env.production';
// eslint-disable-next-line no-console
console.log(`Loading env file: ${path}`);
config({ path });

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './migrations',
  dialect: 'postgresql',
  dbCredentials: {
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD
  },
  extensionsFilters: ['postgis'],
  schemaFilter: ['public'],
  tablesFilter: ['*']
});
