import { CreateUserDTO, UserDTO } from "~/server/dto/user";

import { UserPort } from "./user-port";

export class UserInMemoryRepo implements UserPort {
  private users: UserDTO[] = [];

  async createUser(data: CreateUserDTO): Promise<void> {
    const newUser: UserDTO = {
      id: crypto.randomUUID(),
      passwordResetTimestamp: null,
      ...data,
    };
    this.users.push(newUser);
  }

  async findUserByEmail(email: string): Promise<UserDTO | null> {
    return this.users.find((user) => user.email === email) || null;
  }

  async findUserById(id: string): Promise<UserDTO | null> {
    return this.users.find((user) => user.id === id) || null;
  }

  async updateUser(id: string, data: Partial<UserDTO>): Promise<void> {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      const currentUser = this.users[userIndex];
      if (!currentUser) return;
      this.users[userIndex] = {
        ...currentUser,
        ...data,
      };
    }
  }

  async deleteUser(id: string): Promise<void> {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
