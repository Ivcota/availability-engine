import { CreateUserDTO, UpdateUserDTO, UserDTO } from "~/server/dto/user";

import { User } from "./user";
import { UserHelperPort } from "./user-helper-port";
import { UserPort } from "./user-port";

interface UserServicePort {
  createUser(data: CreateUserDTO): Promise<User>;
  updateUser(id: string, data: UpdateUserDTO): Promise<User>;
  deleteUser(id: string): Promise<undefined | null>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(id: string): Promise<User | null>;
  generateRandomPassword(id: string): Promise<User>;
}

export class UserService implements UserServicePort {
  constructor(
    private readonly userRepo: UserPort,
    private readonly userHelper: UserHelperPort,
  ) {}

  async createUser(data: CreateUserDTO): Promise<User> {
    const hashedPassword = this.userHelper.generateHash(data.password);
    await this.userRepo.createUser({ ...data, password: hashedPassword });
    const user = await this.userRepo.findUserByEmail(data.email);

    if (!user) {
      console.log(user);
      throw new Error("User not found");
    }

    return user;
  }

  async updateUser(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepo.findUserById(id);
    let hashedPassword: string | undefined;

    if (data.password) {
      hashedPassword = this.userHelper.generateHash(data.password);
    }

    if (!user) {
      throw new Error("User not found");
    }

    await this.userRepo.updateUser(id, {
      ...data,
      password: hashedPassword,
    });
    const updatedUser = await this.userRepo.findUserById(id);

    if (!updatedUser) {
      throw new Error("User not found");
    }

    return updatedUser;
  }

  async deleteUser(id: string): Promise<null | undefined> {
    await this.userRepo.deleteUser(id);
    const user = await this.userRepo.findUserById(id);
    if (user) {
      throw Error("Failed to delete user");
    }
    return user;
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findUserByEmail(email);

    return user;
  }

  async generateRandomPassword(id: string): Promise<User> {
    const user = await this.userRepo.findUserById(id);

    if (!user) {
      throw new Error("User not found");
    }
    const updatedUser = await this.userHelper.generatePasswordForEmail(
      user.email,
    );

    return User.fromDTO({ ...updatedUser });
  }
}
