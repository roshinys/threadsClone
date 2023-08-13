import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGO_URI) {
    console.log("Missing MongoDB URL");
    return;
  }
  if (isConnected) {
    console.log("MongoDB connection already established");
    return;
  }
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
    isConnected = true;
  } catch (error) {
    console.log(error);
  }
};
