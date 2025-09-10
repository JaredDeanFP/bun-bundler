import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const pricing = sqliteTable("pricing", {
  id: text("id").notNull(),
  pricing: real("pricing").notNull(),
  mod: real("mod").notNull(),
  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export type Pricing = typeof pricing.$inferSelect;
export type NewPricing = typeof pricing.$inferInsert;