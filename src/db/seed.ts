import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { vehicles, settings } from "./schema";

async function seed() {
  const sql = neon(process.env.DATABASE_URL!);
  const db = drizzle(sql);

  console.log("Seeding T8 Auto database...");

  // ─── Seed vehicles (T8's actual fleet) ──────────────────
  await db.insert(vehicles).values([
    {
      make: "Dacia",
      model: "Duster",
      year: 2024,
      color: "Gris",
      category: "suv",
      transmission: "auto",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 500,
      weeklyRate: 3000,
      monthlyRate: 12000,
      features: ["GPS", "Bluetooth", "USB"],
      images: [],
      status: "available",
      sortOrder: 1,
    },
    {
      make: "Hyundai",
      model: "Accent",
      year: 2024,
      color: "Gris",
      category: "midrange",
      transmission: "auto",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 400,
      weeklyRate: 2500,
      monthlyRate: 10000,
      features: ["Bluetooth", "USB"],
      images: [],
      status: "available",
      sortOrder: 2,
    },
    {
      make: "Dacia",
      model: "Logan",
      year: 2024,
      color: "Gris",
      category: "economy",
      transmission: "manual",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 350,
      weeklyRate: 2100,
      monthlyRate: 9000,
      features: ["USB"],
      images: [],
      status: "available",
      sortOrder: 3,
    },
    {
      make: "Renault",
      model: "Clio 5",
      year: 2024,
      color: "Gris",
      category: "economy",
      transmission: "manual",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 350,
      weeklyRate: 2100,
      monthlyRate: 9000,
      features: ["Bluetooth", "USB"],
      images: [],
      status: "available",
      sortOrder: 4,
    },
    {
      make: "Renault",
      model: "Clio 5",
      year: 2024,
      color: "Noir",
      category: "economy",
      transmission: "manual",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 350,
      weeklyRate: 2100,
      monthlyRate: 9000,
      features: ["Bluetooth", "USB"],
      images: [],
      status: "available",
      sortOrder: 5,
    },
    {
      make: "Renault",
      model: "Clio 5",
      year: 2024,
      color: "Bleu",
      category: "economy",
      transmission: "manual",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 350,
      weeklyRate: 2100,
      monthlyRate: 9000,
      features: ["Bluetooth", "USB"],
      images: [],
      status: "available",
      sortOrder: 6,
    },
    {
      make: "Renault",
      model: "Clio 4",
      year: 2022,
      color: "Gris",
      category: "economy",
      transmission: "manual",
      fuel: "diesel",
      hasAC: true,
      dailyRate: 300,
      weeklyRate: 1800,
      monthlyRate: 7500,
      features: ["USB"],
      images: [],
      status: "available",
      sortOrder: 7,
    },
  ]);

  console.log("✓ 7 vehicles seeded");

  // ─── Seed default settings ──────────────────────────────
  await db.insert(settings).values([
    {
      key: "business_info",
      value: {
        name: "T8 Auto",
        tagline: "Votre solution fiable pour la location de voitures",
        phone1: "+212 660 027 233",
        phone2: "+212 672 400 030",
        email: "contact@t8-auto.com",
        address: "Boulevard Hanane Idrissi, Tanger 90000",
        instagram: "@t8_auto",
        whatsapp: "212660027233",
      },
    },
    {
      key: "pickup_locations",
      value: [
        { id: "airport", label: "Aéroport Tanger Ibn Battouta" },
        { id: "tgv", label: "Gare TGV Tanger" },
        { id: "port", label: "Port Tanger Med" },
        { id: "office", label: "Bureau T8 — Bd Hanane Idrissi" },
      ],
    },
    {
      key: "pricing_rules",
      value: {
        weeklyDiscountPercent: 15,
        monthlyDiscountPercent: 25,
      },
    },
    {
      key: "working_hours",
      value: {
        open: "08:00",
        close: "20:00",
        timeSlotMinutes: 30,
      },
    },
  ]);

  console.log("✓ Settings seeded");
  console.log("Done!");
}

seed().catch(console.error);
