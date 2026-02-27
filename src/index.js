import dotenv from "dotenv";
dotenv.config();


import {app} from "./app.js";
import connectDb from "./db/index.js";

console.log("Starting server...");

connectDb()
  .then(() => {
    console.log("Database connected successfully ✅");
  })
  .catch((err) => {
    console.error("DB Error:", err);
  });


  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT} 🚀`);
  });
 

/*
import express from 'express';
const app = express();
( async() =>{
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    app.on('error', (error) => {
      console.error('Error starting the server:', error);
    });
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  } catch (error){
    console.error('Error connecting to MongoDB:', error); 
    throw error;
  }
})()
*/