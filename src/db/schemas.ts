import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const featuredProperties = sqliteTable('featuredProperties', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  imageUrl: text('imageUrl').notNull(),
  propertyType: text('propertyType').notNull(),

  annualYieldPercent: real('annualYieldPercent').notNull(),
  approvedValuation: real('approvedValuation').notNull(),

  availableUnits: integer('availableUnits').notNull(),
  totalUnits: integer('totalUnits').notNull(),

  riskScore: real('riskScore').notNull(),

  pricePerUnitEth: real('pricePerUnitEth').notNull(),

  description: text('description'),

  userOwned: integer('userOwned', { mode: 'boolean' }).default(false),
  status: integer('status'),
});
