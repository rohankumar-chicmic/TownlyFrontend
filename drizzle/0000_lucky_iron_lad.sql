CREATE TABLE `accountBalances` (
	`walletAddress` text PRIMARY KEY NOT NULL,
	`totalGranted` real DEFAULT 0 NOT NULL,
	`totalUsed` real DEFAULT 0 NOT NULL,
	`availableBalance` real DEFAULT 0 NOT NULL,
	`syncedAt` text
);
--> statement-breakpoint
CREATE TABLE `featuredProperties` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`imageUrl` text NOT NULL,
	`propertyType` text NOT NULL,
	`annualYieldPercent` real NOT NULL,
	`approvedValuation` real NOT NULL,
	`availableUnits` integer NOT NULL,
	`totalUnits` integer NOT NULL,
	`riskScore` real,
	`pricePerUnitEth` real NOT NULL,
	`description` text,
	`userOwned` integer DEFAULT false,
	`status` integer
);
--> statement-breakpoint
CREATE TABLE `portfolioAllocation` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` text NOT NULL,
	`percentage` real NOT NULL,
	`snapshotAt` text
);
--> statement-breakpoint
CREATE TABLE `portfolioSummary` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`currentValueEth` real NOT NULL,
	`monthlyIncomeEth` real NOT NULL,
	`totalInvestedEth` real NOT NULL,
	`totalReturnEth` real NOT NULL,
	`totalReturnPercent` real NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `portfolioValueHistory` (
	`id` integer PRIMARY KEY NOT NULL,
	`data` text NOT NULL,
	`updatedAt` text
);
--> statement-breakpoint
CREATE TABLE `properties` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`imageUrl` text,
	`propertyType` text NOT NULL,
	`status` integer,
	`approvedValuation` real NOT NULL,
	`totalUnits` integer NOT NULL,
	`availableUnits` integer NOT NULL,
	`pricePerUnitEth` real NOT NULL,
	`annualYieldPercent` real NOT NULL,
	`riskScore` real
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`transactionId` text PRIMARY KEY NOT NULL,
	`propertyId` text NOT NULL,
	`propertyName` text NOT NULL,
	`type` integer NOT NULL,
	`status` text NOT NULL,
	`currency` text NOT NULL,
	`amountUsd` real NOT NULL,
	`amountEth` real NOT NULL,
	`ethAmountAtExecution` real,
	`ethUsdRateAtExecution` real NOT NULL,
	`createdAt` text NOT NULL,
	`syncedAt` text
);
--> statement-breakpoint
CREATE TABLE `userInvestments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`propertyId` text NOT NULL,
	`propertyName` text NOT NULL,
	`propertyType` text NOT NULL,
	`propertyImageUrl` text,
	`location` text NOT NULL,
	`riskScore` real,
	`annualYieldPercent` real NOT NULL,
	`sharesPurchased` integer NOT NULL,
	`totalInvestedEth` real NOT NULL,
	`currentValueEth` real NOT NULL,
	`totalReturnEth` real NOT NULL,
	`monthlyIncomeEth` real NOT NULL,
	`totalAmountUsd` real NOT NULL,
	`investedAt` text NOT NULL
);
