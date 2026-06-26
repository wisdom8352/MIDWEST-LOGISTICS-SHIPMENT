import bcryptjs from "bcryptjs";
import { getAdminByEmail } from "../db";

const SALT_ROUNDS = 10;

/**
 * Hash a password using bcryptjs
 */
export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, SALT_ROUNDS);
}

/**
 * Compare a plain text password with a hashed password
 */
export async function comparePassword(
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> {
  return bcryptjs.compare(plainPassword, hashedPassword);
}

/**
 * Verify admin credentials and return admin data if valid
 */
export async function verifyAdminCredentials(
  email: string,
  password: string
) {
  const admin = await getAdminByEmail(email);
  
  if (!admin) {
    return null;
  }

  const isPasswordValid = await comparePassword(password, admin.password);
  
  if (!isPasswordValid) {
    return null;
  }

  // Return admin data without password
  const { password: _, ...adminData } = admin;
  return adminData;
}
