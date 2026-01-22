/**
 * Standalone Migration Runner
 * ===========================
 * 
 * Runs Knex migrations without requiring the full knex CLI.
 * Designed to work in the minimal production Docker image.
 * 
 * Handles TypeScript migrations by using tsx/ts-node or 
 * falling back to requiring them directly (Node 22+ can handle simple TS).
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const knex = require('knex');
const path = require('path');
const fs = require('fs');

async function runMigrations() {
  const databaseUrl = process.env.DATABASE_URL;
  
  if (!databaseUrl) {
    console.error('❌ DATABASE_URL environment variable is required');
    process.exit(1);
  }

  // Determine migrations directory (production vs development)
  const migrationsDir = fs.existsSync(path.join(__dirname, 'migrations'))
    ? path.join(__dirname, 'migrations')  // Production: /app/migrations
    : path.join(__dirname, '../src/db/migrations');  // Development

  console.log(`📂 Using migrations from: ${migrationsDir}`);

  const db = knex({
    client: 'pg',
    connection: databaseUrl,
    migrations: {
      directory: migrationsDir,
      tableName: 'knex_migrations',
      // Support both .ts and .js files
      loadExtensions: ['.ts', '.js'],
    },
  });

  try {
    console.log('🔍 Checking pending migrations...');
    
    const [, pending] = await db.migrate.list();

    if (pending.length === 0) {
      console.log('✅ Database is up to date (no pending migrations)');
    } else {
      console.log(`📦 Found ${pending.length} pending migration(s):`);
      pending.forEach(m => console.log(`   - ${m.name || m.file || m}`));
      
      console.log('⏳ Applying migrations...');
      const [batchNo, applied] = await db.migrate.latest();
      
      if (applied.length > 0) {
        console.log(`✅ Batch ${batchNo} applied ${applied.length} migration(s):`);
        applied.forEach(m => console.log(`   ✓ ${m}`));
      }
    }

    await db.destroy();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    if (process.env.DEBUG) {
      console.error(error.stack);
    }
    await db.destroy();
    process.exit(1);
  }
}

runMigrations();
