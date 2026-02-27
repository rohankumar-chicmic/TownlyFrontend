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

export const portfolioSummary = sqliteTable('portfolioSummary', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  currentValueEth: real('currentValueEth').notNull(),
  monthlyIncomeEth: real('monthlyIncomeEth').notNull(),
  totalInvestedEth: real('totalInvestedEth').notNull(),
  totalReturnEth: real('totalReturnEth').notNull(),
  totalReturnPercent: real('totalReturnPercent').notNull(),
  updatedAt: text('updatedAt'),
});

export const properties = sqliteTable('properties', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  location: text('location').notNull(),
  imageUrl: text('imageUrl'),
  propertyType: text('propertyType').notNull(),
  status: integer('status'),

  approvedValuation: real('approvedValuation').notNull(),
  totalUnits: integer('totalUnits').notNull(),
  availableUnits: integer('availableUnits').notNull(),

  pricePerUnitEth: real('pricePerUnitEth').notNull(),
  annualYieldPercent: real('annualYieldPercent').notNull(),
  riskScore: real('riskScore').notNull(),
});

export const userInvestments = sqliteTable('userInvestments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  propertyId: text('propertyId').notNull(),
  propertyName: text('propertyName').notNull(),
  propertyType: text('propertyType').notNull(),
  propertyImageUrl: text('propertyImageUrl'),
  location: text('location').notNull(),

  riskScore: real('riskScore').notNull(),
  annualYieldPercent: real('annualYieldPercent').notNull(),

  sharesPurchased: integer('sharesPurchased').notNull(),
  totalInvestedEth: real('totalInvestedEth').notNull(),
  currentValueEth: real('currentValueEth').notNull(),
  totalReturnEth: real('totalReturnEth').notNull(),
  monthlyIncomeEth: real('monthlyIncomeEth').notNull(),
  totalAmountUsd: real('totalAmountUsd').notNull(),

  investedAt: text('investedAt').notNull(),
});

export const portfolioValueHistory = sqliteTable('portfolioValueHistory', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  label: text('label').notNull(),
  value: real('value').notNull(),
  recordedAt: text('recordedAt'),
});

export const portfolioAllocation = sqliteTable('portfolioAllocation', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  category: text('category').notNull(),
  percentage: real('percentage').notNull(),
  snapshotAt: text('snapshotAt'),
});

export const transactions = sqliteTable('transactions', {
  transactionId: text('transactionId').primaryKey(),
  propertyId: text('propertyId').notNull(),
  propertyName: text('propertyName').notNull(),

  type: integer('type').notNull(),
  status: text('status').notNull(),
  currency: text('currency').notNull(),

  amountUsd: real('amountUsd').notNull(),
  amountEth: real('amountEth').notNull(),
  ethAmountAtExecution: real('ethAmountAtExecution').notNull(),
  ethUsdRateAtExecution: real('ethUsdRateAtExecution').notNull(),

  createdAt: text('createdAt').notNull(),
  syncedAt: text('syncedAt'),
});
