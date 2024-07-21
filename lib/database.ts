import mongoose from "mongoose";

let isConnected = false; // track the connection

const { MONGODB_URI } = process.env;

export async function connectToDB() {
  mongoose.set("strictQuery", true);

  if (isConnected) return;

  try {
    await mongoose.connect(`${MONGODB_URI}`, {
      dbName: "financial",
    });

    isConnected = true;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`Failed to connect to MongoDB: ${error.message}`);
    }
  }
}
