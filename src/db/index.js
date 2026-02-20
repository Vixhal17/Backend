import mongoose from 'mongoose';
import { DB_NAME } from '../constant.js';

const connectDb = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );

    console.log(`MongoDB connected!! : ${connectionInstance.connection.host}`);
  } catch (error) {
    console.error(`Error connecting to the database: ${error.message}`);
    process.exit(1);
  }
};

export default connectDb;
