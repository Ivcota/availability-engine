import { UserDTO } from "~/server/dto/user";
import { UserHelperPort } from "./user-helper-port";
import { UserPort } from "./user-port";
import { generateIdFromEntropySize } from "lucia";
import { hashPassword } from "~/server/utils/utils";

export class UserHelper implements UserHelperPort {
  constructor(private readonly userRepo: UserPort) {}

  generateHash(password: string): string {
    return hashPassword(password);
  }

  compareHash(password: string, hash: string): boolean {
    return hashPassword(password) === hash;
  }

  async generatePasswordForEmail(email: string): Promise<UserDTO> {
    const password = generateIdFromEntropySize(10);
    const hashedPassword = this.generateHash(password);
    const user = await this.userRepo.findUserByEmail(email);
    if (!user) {
      throw new Error("User not found");
    }
    await this.userRepo.updateUser(user.id, { password: hashedPassword });
    const updatedUser = await this.userRepo.findUserById(user.id);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }
}
