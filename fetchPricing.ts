import { db } from "./src/db/index";
import { pricing as pricingTable } from "./src/db/schema";
import {alias} from "drizzle-orm/sqlite-core";
import {eq} from "drizzle-orm";

export type Pricing = {
    id: string;
    pricing: number;
    mod: number;
    extraPricing: number;
}

export async function fetchPricing(): Promise<Pricing[]> {
    const parent = alias(pricingTable, 'duplicatePricing');


    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    await db.select().from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
    return await db.select({
        id: pricingTable.id,
        pricing: pricingTable.pricing,
        mod: pricingTable.mod,
        extraPricing: parent.pricing
    }).from(pricingTable).innerJoin(parent, eq(pricingTable.id, parent.id));
}