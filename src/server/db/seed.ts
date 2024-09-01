import { UserFactory } from "../factories/user-factory";

const main = async () => {
  console.log("\n");
  console.log("Seeding database...");

  await UserFactory.create({
    email: "test@example.com",
    password: "password",
  });

  console.log("Database seeded successfully.");
  process.exit(0);
};

await main();
