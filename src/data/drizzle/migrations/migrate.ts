import 'dotenv/config';

import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool);

async function main() {
  console.log('migration Started');
  await migrate(db, { migrationsFolder: './src/data/drizzle/migrations' });
  console.log('migration Ended');
  process.exit(0);
}

main().catch((err: any) => {
  console.log('err', err);
  process.exit(0);
});
