/**
 * Creates an admin account, or resets the password if the email already exists.
 * Usage: npm run admin:create -- <email> <password>
 */
import { prisma } from "../lib/prisma.js";
import { userRepository } from "../repositories/user.repository.js";
import { authService } from "../services/auth.service.js";

async function main() {
  const [email, password] = process.argv.slice(2);
  if (!email || !password || password.length < 8) {
    console.error("Usage: npm run admin:create -- <email> <password (min 8 chars)>");
    process.exit(1);
  }

  const normalizedEmail = email.trim().toLowerCase();
  const passwordHash = await authService.hashPassword(password);
  const existing = await userRepository.findByEmail(normalizedEmail);

  if (existing) {
    await userRepository.updatePassword(normalizedEmail, passwordHash);
    console.log(`Updated password for ${normalizedEmail}`);
  } else {
    await userRepository.create({ email: normalizedEmail, passwordHash, name: "Admin" });
    console.log(`Created admin ${normalizedEmail}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
