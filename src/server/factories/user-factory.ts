import { db } from "../db";
import { faker } from "@faker-js/faker";
import { hashPassword } from "../utils/utils";
import { userTable } from "../db/schema";

export class UserFactory {
  public static async create({
    firstName,
    lastName,
    email,
    password,
  }: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
  }) {
    return db.insert(userTable).values({
      id: faker.string.uuid(),
      firstName: firstName ?? faker.person.firstName(),
      lastName: lastName ?? faker.person.lastName(),
      email: email ?? faker.internet.email(),
      password: hashPassword(password ?? "password"),
    });
  }
}
