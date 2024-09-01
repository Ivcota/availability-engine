import { db } from "../db";
import { eq } from "drizzle-orm";
import { leadTable } from "../db/schema";

export class Lead {
  public static async findById(id: string) {
    return await db.query.leadTable.findFirst({
      where: eq(leadTable.id, id),
    });
  }
  public static async findByEmail(email: string) {
    return await db.query.leadTable.findFirst({
      where: eq(leadTable.email, email),
    });
  }

  public static async findByUserId(userId: string) {
    return await db.query.leadTable.findFirst({
      where: eq(leadTable.userId, userId),
    });
  }

  public static async create(data: { email: string; userId?: string }) {
    return await db.insert(leadTable).values({
      email: data.email,
      userId: data.userId ?? null,
    });
  }
  public static async delete(id: string) {
    return await db.delete(leadTable).where(eq(leadTable.id, id));
  }

  public static async update(
    id: string,
    data: {
      email: string;
      userId?: string;
    },
  ) {
    const existingLead = await Lead.findById(id);
    return await db
      .update(leadTable)
      .set({
        email: data.email ?? existingLead?.email,
        userId: data.userId ?? existingLead?.userId,
      })
      .where(eq(leadTable.id, id));
  }
}
