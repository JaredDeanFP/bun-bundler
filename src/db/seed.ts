import { db } from "./index";
import { pricing } from "./schema";

function generateRandomPricing(): number {
  return Math.round((Math.random() * 999.98 + 0.01) * 100) / 100;
}

function generateRandomMod(): number {
  return Math.round((Math.random() * 4.9 + 0.1) * 100) / 100;
}

export async function seedDatabase() {
  console.log("Starting database seeding...");
  
  const existingCount = await db.select().from(pricing).limit(1);
  if (existingCount.length > 0) {
    console.log("Database already contains data, skipping seed");
    return;
  }

  const numUniqueIds = 1000;
  const recordsPerIdCount = 10000;
  const batchSize = 1000;
  let totalRecordsInserted = 0;
  let globalRecordId = 1;

  for (let productIdIndex = 1; productIdIndex <= numUniqueIds; productIdIndex++) {
    const productId = `product_${productIdIndex}`;
    
    for (let batchStartIndex = 0; batchStartIndex < recordsPerIdCount; batchStartIndex += batchSize) {
      const batch = [];
      const recordsInBatch = Math.min(batchSize, recordsPerIdCount - batchStartIndex);
      
      for (let i = 0; i < recordsInBatch; i++) {
        batch.push({
          id: productId,
          pricing: generateRandomPricing(),
          mod: generateRandomMod(),
        });
      }

      await db.insert(pricing).values(batch);
      totalRecordsInserted += recordsInBatch;
      
      const progress = Math.round((totalRecordsInserted / (numUniqueIds * recordsPerIdCount)) * 100);
      console.log(`Seeding progress: ${progress}% (${totalRecordsInserted}/${numUniqueIds * recordsPerIdCount} records)`);
    }
  }

  console.log("Database seeding completed!");
  console.log(`Total records in database: ${totalRecordsInserted}`);
  console.log(`Records created for ${numUniqueIds} unique product IDs with ${recordsPerIdCount} records each`);
}