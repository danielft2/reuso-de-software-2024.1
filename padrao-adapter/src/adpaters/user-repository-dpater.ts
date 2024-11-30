import { User } from "../entities/user.js";

export interface UserRepositoryAdpater {
  addUser: (user: User) => Promise<void>;
} 