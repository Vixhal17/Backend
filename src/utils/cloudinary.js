import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) =>{
  try {
    if(!localFilePath) return null;
    //uplaod the file
    const response = cloudinary.uploader.upload(localFilePath,{
      resource_type: "auto",
    })
    //file uploaded successfully
    console.log("File uploaded successfully",(await response).url);
    return response;
    
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the locally saved file
    console.log("Error uploading file to Cloudinary", error);
    return null;
    
  }
}

export { uploadOnCloudinary };
