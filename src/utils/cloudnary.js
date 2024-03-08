import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//creating a method for upload images to database and if its successful, it unlinks the file from the local storage

const uploadOnCloudinary = async localFilePath => {
  try {
    if (!localFilePath) return null
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    })
    //file has been upload successfully,
    console.log('file uploaded successfully', response.url)
    return response.url
  } catch (error) {
    fs.unlinkSync(localFilePath) // remove the file from the local storage
    return null
  }
}

export { uploadOnCloudinary }
