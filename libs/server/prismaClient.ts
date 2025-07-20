import { PrismaClient } from "@prisma/client";

declare global {
  var prismaclient: PrismaClient | undefined;
}

let prismaclient: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prismaclient = new PrismaClient();
} else {
  if (!global.prismaclient) {
    global.prismaclient = new PrismaClient();
  }
  prismaclient = global.prismaclient;
}

export default prismaclient;
