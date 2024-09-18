import { CreateUserDTO, UserDTO } from "~/server/dto/user";
import { DB, db as dbInstance } from "~/server/db";

import { User } from "./user";
import { UserPort } from "./user-port";
import { eq } from "drizzle-orm";
import { userTable } from "~/server/db/schema";

export class UserDrizzleRepo implements UserPort {
  constructor(private readonly db: DB = dbInstance) {}

  async createUser(data: CreateUserDTO) {
    await this.db.insert(userTable).values({
      email: data.email,
      password: data.password,
      firstName: data?.firstName,
      lastName: data?.lastName,
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });

    if (!user) return null;

    return User.fromDTO({
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      passwordResetTimestamp: user?.passwordResetTimestamp,
    });
  }

  async findUserById(id: string): Promise<User | null> {
    const user = await this.db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });

    if (!user) return null;

    return User.fromDTO({
      id: user.id,
      email: user.email,
      password: user.password,
      firstName: user?.firstName ?? undefined,
      lastName: user?.lastName ?? undefined,
      passwordResetTimestamp: user?.passwordResetTimestamp,
    });
  }

  async updateUser(id: string, data: Partial<UserDTO>) {
    await this.db.update(userTable).set(data).where(eq(userTable.id, id));
  }

  async deleteUser(id: string): Promise<void> {
    await this.db.delete(userTable).where(eq(userTable.id, id));
  }
}
