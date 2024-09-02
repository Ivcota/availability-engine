import { UserDTO } from "~/server/dto/user";

export interface UserHelperPort {
  generateHash(password: string): string;
  compareHash(password: string, hash: string): boolean;
  generatePasswordForEmail(email: string): Promise<UserDTO>;
}
