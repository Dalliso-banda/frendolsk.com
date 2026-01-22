import knex, { Knex } from 'knex';
import { database, env } from '@/config/env';

let db: Knex | null = null;

/**
 * Get database connection instance (singleton pattern)
 */
export function getDb(): Knex {
  if (!db) {
    const connectionConfig =
      database.url ||
      ({
        host: database.host,
        port: database.port,
        database: database.name,
        user: database.user,
        password: database.password,
        ...(env.isProduction && {
          ssl: { rejectUnauthorized: false },
        }),
      } as Knex.PgConnectionConfig);

    db = knex({
      client: 'pg',
      connection: connectionConfig,
      pool: {
        min: 2,
        max: 10,
      },
    });
  }
  return db;
}

/**
 * Close database connection (for graceful shutdown)
 */
export async function closeDb(): Promise<void> {
  if (db) {
    await db.destroy();
    db = null;
  }
}

/**
 * Check database health
 */
export async function checkDbHealth(): Promise<boolean> {
  try {
    const database = getDb();
    await database.raw('SELECT 1');
    return true;
  } catch {
    return false;
  }
}
