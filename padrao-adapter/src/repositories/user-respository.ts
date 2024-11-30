import { UserRepositoryAdpater } from "../adpaters/user-repository-dpater.js";
import { User } from "../entities/user.js";

export class UserRepository {
  constructor (private userRepositoryImpl: UserRepositoryAdpater) {}

  public async addUser(user: User) {
    await this.userRepositoryImpl.addUser(user);
  }
}