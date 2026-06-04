import type { Knex } from 'knex';
import bcrypt from 'bcryptjs';
import { admin } from '@/config/env';

export async function seed(knex: Knex): Promise<void> {
  await knex('sessions').del();
  await knex('admin_users').del();

  const adminEmail = admin.email;
  const adminPassword = admin.password;
  const passwordHash = await bcrypt.hash(adminPassword, 12);

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