import app from "./app";
import config from "./config";
import { prisma } from "./lib/prisma";

async function main() {

  const port = config.port
  try {
    await prisma.$connect();
    console.log("db connected")
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Server Error", error);
    await prisma.$disconnect();
    process.exit(1)
  }
}

main();
