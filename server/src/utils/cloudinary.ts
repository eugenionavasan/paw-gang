import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
}

export const uploadToCloudinary = (imageUrl: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(imageUrl, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result as CloudinaryUploadResult);
      }
    });
  });
};
