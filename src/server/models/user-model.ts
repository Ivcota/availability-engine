import { db } from "../db";
import { eq } from "drizzle-orm";
import { generateIdFromEntropySize } from "lucia";
import { hashPassword } from "../utils/utils";
import { userTable } from "../db/schema";

export class User {
  public static async generatePasswordForEmail(email: string) {
    const password = generateIdFromEntropySize(10);
    const hashedPassword = hashPassword(password);
    await db
      .update(userTable)
      .set({
        password: hashedPassword,
        passwordResetTimestamp: new Date(),
      })
      .where(eq(userTable.email, email));

    return password;
  }
  public static async findById(id: string) {
    return await db.query.userTable.findFirst({
      where: eq(userTable.id, id),
    });
  }
  public static async findByEmail(email: string) {
    return await db.query.userTable.findFirst({
      where: eq(userTable.email, email),
    });
  }
  public static async create(data: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
  }) {
    return await db.insert(userTable).values({
      email: data.email,
      password: data.password,
      firstName: data?.firstName,
      lastName: data?.lastName,
    });
  }
  public static async delete(id: string) {
    return await db.delete(userTable).where(eq(userTable.id, id));
  }

  public static async update(
    id: string,
    data: {
      email: string;
      firstName?: string;
      lastName?: string;
    },
  ) {
    const existingUser = await User.findById(id);

    if (!existingUser) {
      throw new Error("User not found");
    }

    return await db
      .update(userTable)
      .set({
        email: data.email ?? existingUser?.email,
        firstName: data.firstName ?? existingUser?.firstName,
        lastName: data.lastName ?? existingUser?.lastName,
      })
      .where(eq(userTable.id, id));
  }
}
