import dotenv from "dotenv";

dotenv.config(); // Load .env variables

export const config = {
  databaseUrl: process.env.DATABASE_URL as string,
  senderEmail: process.env.SENDERS_EMAIL as string,
  senderPass: process.env.SENDERS_PASS as string,
};
