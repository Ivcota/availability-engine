// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { pgTableCreator, text, timestamp, uuid } from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `ivcota-stack_${name}`);

export const userTable = createTable("user", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  firstName: text("first_name"),
  lastName: text("last_name"),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  passwordResetTimestamp: timestamp("password_reset_timestamp"),
});

export const sessionTable = createTable("sessions", {
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const leadTable = createTable("leads", {
  id: uuid("id").notNull().primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  userId: uuid("user_id").references(() => userTable.id),
});
