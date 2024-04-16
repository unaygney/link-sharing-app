import mongoose from "mongoose";

let connected = false;
export default async function connectDB() {
  mongoose.set("strictQuery", true);

  if (connected) {
    console.log("Mongodb is already connected..");
    return;
  }

  // connect to MongoDb
  try {
    await mongoose.connect(process.env.NEXT_APP_MONGO_URI);
    connected = true;
    console.log("MongoDB connected...");
  } catch (err) {
    console.log(err);
  }
}
