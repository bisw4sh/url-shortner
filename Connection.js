import mongoose from "mongoose";
mongoose.set("strictQuery", true);

export async function connectToMongoDB() {
  return mongoose.connect(process.env.MONGO_URL);
}
