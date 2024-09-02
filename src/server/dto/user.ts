export interface CreateUserDTO {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
}

export interface UpdateUserDTO {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
}

export interface UserDTO {
  id: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  passwordResetTimestamp: Date | null;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  passwordResetTimestamp: Date | null;
}
