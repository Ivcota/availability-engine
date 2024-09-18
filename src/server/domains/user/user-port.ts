import { CreateUserDTO, UserDTO } from "~/server/dto/user";

import { User } from "./user";

export interface UserPort {
  createUser: (data: CreateUserDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<User | null>;
  findUserById: (id: string) => Promise<User | null>;
  updateUser: (id: string, data: Partial<UserDTO>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
