import { PrismaClient } from "@prisma/client";

export class PrismaClientORM {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
    this.init();
  }

  public getClient() {
    return this.prismaClient;
  }

  private async init() {
    try {
      console.log("Initializing Prisma client...");
      await this.prismaClient.$connect();
      console.log("Prisma client connected successfully.");
    } catch (e) {
      console.error("Error initializing Prisma client:", e);
      await this.prismaClient.$disconnect();
      process.exit(1); 
    }
  }
}