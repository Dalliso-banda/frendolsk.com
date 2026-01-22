import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import { admin } from '@/config/env';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing data
  await knex('sessions').del();
  await knex('admin_users').del();

  // Get admin credentials from centralized config (env vars)
  const adminEmail = admin.email;
  const adminPassword = admin.password;

  // Hash the password
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  // Insert admin user
  await knex('admin_users').insert({
    email: adminEmail,
    password_hash: passwordHash,
    display_name: 'Site Admin',
    totp_enabled: false,
  });

  console.log('✓ Admin user seeded');
  console.log(`  Email: ${adminEmail}`);
  console.log('  IMPORTANT: Change the password after first login!');
}
