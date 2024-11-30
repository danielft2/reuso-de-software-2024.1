import { UserRepositoryAdpater } from "../adpaters/user-repository-dpater.js";
import { User } from "../entities/user.js";

export class userRepositoryInMemory implements UserRepositoryAdpater {
  private users: User[] = [];

  public async addUser(user: User) {
    this.users.push(user);
  };
}