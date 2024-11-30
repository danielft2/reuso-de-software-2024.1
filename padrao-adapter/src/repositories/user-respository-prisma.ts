import { UserRepositoryAdpater } from "../adpaters/user-repository-dpater.js";
import { User } from "../entities/user.js";
import { PrismaClientORM } from "../clients/prisma-client-orm.js";
import { PrismaClient } from "@prisma/client";

export class UserRepositoryPrisma implements UserRepositoryAdpater {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClientORM().getClient();
  }

  public async addUser(user: User) {
    await this.prisma.user.create({
      data: user
    })
  };
}