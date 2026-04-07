import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { vehicles } from "../src/db/schema";
import { eq } from "drizzle-orm";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql);

// Original T8 website professional car images
const CAR_IMAGES: { sortOrder: number; file: string }[] = [
  { sortOrder: 1, file: "/tmp/t8-cars/1-duster.jpg" },
  { sortOrder: 2, file: "/tmp/t8-cars/2-accent.jpg" },
  { sortOrder: 3, file: "/tmp/t8-cars/3-logan.jpg" },
  { sortOrder: 4, file: "/tmp/t8-cars/4-clio5-gris.jpg" },
  { sortOrder: 5, file: "/tmp/t8-cars/5-clio5-noir.jpg" },
  { sortOrder: 6, file: "/tmp/t8-cars/6-clio5-bleu.jpg" },
  { sortOrder: 7, file: "/tmp/t8-cars/7-clio4.png" },
];

async function uploadAndUpdate() {
  console.log("Uploading T8 original car images to Cloudinary...\n");

  for (const car of CAR_IMAGES) {
    const [vehicle] = await db
      .select()
      .from(vehicles)
      .where(eq(vehicles.sortOrder, car.sortOrder));

    if (!vehicle) {
      console.log(`⚠ No vehicle with sortOrder ${car.sortOrder}`);
      continue;
    }

    console.log(`Uploading: ${vehicle.make} ${vehicle.model} (${vehicle.color})...`);

    try {
      const result = await cloudinary.uploader.upload(car.file, {
        folder: `t8-auto/vehicles/${vehicle.id}`,
        overwrite: true,
        transformation: [
          {
            width: 1200,
            height: 800,
            crop: "limit",
            quality: "auto",
            fetch_format: "auto",
          },
        ],
      });

      await db
        .update(vehicles)
        .set({
          images: [result.secure_url],
          coverImage: result.secure_url,
          updatedAt: new Date(),
        })
        .where(eq(vehicles.id, vehicle.id));

      console.log(`  ✓ ${result.secure_url}\n`);
    } catch (err: any) {
      console.error(`  ✗ Failed: ${err.message || JSON.stringify(err)}\n`);
    }
  }

  console.log("Done!");
}

uploadAndUpdate().catch(console.error);
