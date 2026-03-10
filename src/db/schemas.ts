import { OfflineTaskType } from '@utils/types';
import {
  sqliteTable,
  text,
  integer,
  real,
  blob,
} from 'drizzle-orm/sqlite-core';

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

  riskScore: real('riskScore'),

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
  riskScore: real('riskScore'),
});

export const userInvestments = sqliteTable('userInvestments', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  propertyId: text('propertyId').notNull(),
  propertyName: text('propertyName').notNull(),
  propertyType: text('propertyType').notNull(),
  propertyImageUrl: text('propertyImageUrl'),
  location: text('location').notNull(),

  riskScore: real('riskScore'),
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
  id: integer('id').primaryKey(),
  data: text('data', { mode: 'json' }).notNull(),
  updatedAt: text('updatedAt'),
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
  ethAmountAtExecution: real('ethAmountAtExecution'),
  ethUsdRateAtExecution: real('ethUsdRateAtExecution').notNull(),

  createdAt: text('createdAt').notNull(),
  syncedAt: text('syncedAt'),
});

export const accountBalances = sqliteTable('accountBalances', {
  walletAddress: text('walletAddress').primaryKey(),

  totalGranted: real('totalGranted').notNull().default(0),

  totalUsed: real('totalUsed').notNull().default(0),

  availableBalance: real('availableBalance').notNull().default(0),

  syncedAt: text('syncedAt').$defaultFn(() => new Date().toISOString()),
});

export const offlineTasks = sqliteTable('offline_tasks', {
  id: text('id').primaryKey(),
  type: text('type').$type<OfflineTaskType>().notNull(),
  payload: text('payload', { mode: 'json' }).$type<any>().notNull(),
  status: text('status').default('pending'),
  retries: integer('retries').default(0),
  createdAt: integer('created_at').notNull(),
});

export const offlinePropertyDrafts = sqliteTable('offlinePropertyDrafts', {
  id: text('id').primaryKey(),

  propertyName: text('propertyName').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  propertyType: text('propertyType').notNull(),
  documents: text('documents', { mode: 'json' })
    .$type<
      {
        documentName: string;
        file: any;
      }[]
    >()
    .notNull(),
  totalPropertyValue: real('totalPropertyValue').notNull(),
  numberOfShares: integer('numberOfShares').notNull(),
  rentalIncome: real('rentalIncome').notNull(),
  expectedAnnualYield: real('expectedAnnualYield').notNull(),

  propertyImage: blob('propertyImage').$type<any>().notNull(),
  updatedAt: integer('updatedAt').notNull(),
});
