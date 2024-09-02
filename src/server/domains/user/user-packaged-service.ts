import { UserDrizzleRepo } from "./user-repo";
import { UserHelper } from "./user-helper-adapter";
import { UserService } from "./user-service";

const userRepo = new UserDrizzleRepo();
const userHelper = new UserHelper(userRepo);

export const userService = new UserService(userRepo, userHelper);
