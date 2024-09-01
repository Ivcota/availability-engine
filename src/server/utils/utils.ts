import crypto from "crypto";
/**
 * Highly recommended to use a stronger hashing algorithm like Argon2.
 */
export function hashPassword(password: string): string {
  return crypto.createHash("sha256").update(password).digest("hex");
}
