import { UserDTO } from "../../dto/user";

export class User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  password: string;
  passwordResetTimestamp?: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    firstName?: string,
    lastName?: string,
    passwordResetTimestap?: Date,
  ) {
    this.id = id;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.passwordResetTimestamp = passwordResetTimestap;
  }

  static fromDTO(userDto: UserDTO): User {
    return new User(
      userDto.id,
      userDto.email,
      userDto.password,
      userDto.firstName,
      userDto.lastName,
      userDto.passwordResetTimestamp ?? undefined,
    );
  }
}
