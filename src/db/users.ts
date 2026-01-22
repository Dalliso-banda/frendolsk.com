import { getDb } from './index';
import bcrypt from 'bcryptjs';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithPassword extends User {
  passwordHash: string;
}

/**
 * Find user by email
 */
export async function findUserByEmail(email: string): Promise<User | null> {
  const user = await getDb()('users')
    .select('id', 'email', 'name', 'role', 'created_at as createdAt', 'updated_at as updatedAt')
    .where('email', email)
    .first();

  return user || null;
}

/**
 * Find user by ID
 */
export async function findUserById(id: string): Promise<User | null> {
  const user = await getDb()('users')
    .select('id', 'email', 'name', 'role', 'created_at as createdAt', 'updated_at as updatedAt')
    .where('id', id)
    .first();

  return user || null;
}

/**
 * Verify user credentials
 */
export async function verifyUserCredentials(
  email: string,
  password: string
): Promise<User | null> {
  const user = await getDb()('users')
    .select('id', 'email', 'name', 'role', 'password_hash', 'created_at as createdAt', 'updated_at as updatedAt')
    .where('email', email)
    .first();

  if (!user) {
    return null;
  }

  const isValid = await bcrypt.compare(password, user.password_hash);

  if (!isValid) {
    return null;
  }

  // Return user without password hash
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { password_hash: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

/**
 * Create a new user
 */
export async function createUser(data: {
  email: string;
  name: string;
  password: string;
  role?: 'admin' | 'user';
}): Promise<User> {
  const passwordHash = await bcrypt.hash(data.password, 12);

  const [user] = await getDb()('users')
    .insert({
      email: data.email,
      name: data.name,
      password_hash: passwordHash,
      role: data.role || 'user',
    })
    .returning(['id', 'email', 'name', 'role', 'created_at as createdAt', 'updated_at as updatedAt']);

  return user;
}

/**
 * Update user
 */
export async function updateUser(
  id: string,
  data: Partial<{ email: string; name: string; role: 'admin' | 'user' }>
): Promise<User | null> {
  const [user] = await getDb()('users')
    .where('id', id)
    .update({
      ...data,
      updated_at: new Date(),
    })
    .returning(['id', 'email', 'name', 'role', 'created_at as createdAt', 'updated_at as updatedAt']);

  return user || null;
}

/**
 * Update user password
 */
export async function updateUserPassword(id: string, newPassword: string): Promise<boolean> {
  const passwordHash = await bcrypt.hash(newPassword, 12);

  const result = await getDb()('users')
    .where('id', id)
    .update({
      password_hash: passwordHash,
      updated_at: new Date(),
    });

  return result > 0;
}

/**
 * Delete user
 */
export async function deleteUser(id: string): Promise<boolean> {
  const result = await getDb()('users')
    .where('id', id)
    .delete();

  return result > 0;
}

/**
 * Get all users (admin only)
 */
export async function getAllUsers(): Promise<User[]> {
  return getDb()('users')
    .select('id', 'email', 'name', 'role', 'created_at as createdAt', 'updated_at as updatedAt')
    .orderBy('created_at', 'desc');
}

/**
 * Hash a password (utility function)
 */
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

/**
 * Verify a password against a hash (utility function)
 */
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}
