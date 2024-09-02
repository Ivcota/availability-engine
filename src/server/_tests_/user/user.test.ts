import { beforeEach, describe, expect, it } from "vitest";

import { UserHelper } from "~/server/domains/user/user-helper-adapter";
import { UserInMemoryRepo } from "~/server/domains/user/user-in-mem-repo";
import { UserService } from "~/server/domains/user/user-service";

describe("User Service", () => {
  let userService: UserService;
  let userRepo: UserInMemoryRepo;
  let userHelper: UserHelper;

  beforeEach(() => {
    userRepo = new UserInMemoryRepo();
    userHelper = new UserHelper(userRepo);
    userService = new UserService(userRepo, userHelper);
  });

  it("should create a user", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });

    expect(user).toBeDefined();
    expect(user.email).toBe("test@test.com");
    expect(user.firstName).toBe("John");
    expect(user.lastName).toBe("Doe");
    expect(user.password).not.toBe("password");
  });
  it("should update a user", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });

    const updatedUser = await userService.updateUser(user.id, {
      firstName: "Iverson",
      lastName: "Diles",
      email: "iverson@diles.com",
    });

    expect(updatedUser).toBeDefined();
    expect(updatedUser.email).toBe("iverson@diles.com");
    expect(updatedUser.firstName).toBe("Iverson");
    expect(updatedUser.lastName).toBe("Diles");
  });

  it("should delete a user", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });

    const deletedUser = await userService.deleteUser(user.id);

    expect(deletedUser).toBeNull();
  });
  it("should find a user by id", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });

    const foundUser = await userService.findUserById(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(user.id);
  });
  it("should find a user by email", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });

    const foundUser = await userService.findUserByEmail(user.email);
    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(user.email);
  });

  it("should throw an error if user not found", async () => {
    await expect(userService.findUserById("non-existent-id")).rejects.toThrow(
      "User not found",
    );
  });

  it("should allow for password change", async () => {
    const user = await userService.createUser({
      email: "test@test.com",
      password: "password",
      firstName: "John",
      lastName: "Doe",
    });
    const oldPassword = user.password;

    const updatedUser = await userService.generateRandomPassword(user.id);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.password).not.toBe(oldPassword);
  });
});
