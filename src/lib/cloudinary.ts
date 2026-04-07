import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export { cloudinary };

export async function uploadImage(
  fileBuffer: Buffer,
  folder: string = "t8-auto"
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          transformation: [
            { width: 1200, height: 800, crop: "limit", quality: "auto", fetch_format: "auto" },
          ],
        },
        (error, result) => {
          if (error || !result) return reject(error);
          resolve({ url: result.secure_url, publicId: result.public_id });
        }
      )
      .end(fileBuffer);
  });
}

export async function deleteImage(publicId: string) {
  return cloudinary.uploader.destroy(publicId);
}
