import { CreateUserDTO, UserDTO } from "~/server/dto/user";

export interface UserPort {
  createUser: (data: CreateUserDTO) => Promise<void>;
  findUserByEmail: (email: string) => Promise<UserDTO | null>;
  findUserById: (id: string) => Promise<UserDTO | null>;
  updateUser: (id: string, data: Partial<UserDTO>) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}
