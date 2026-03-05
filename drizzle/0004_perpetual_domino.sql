CREATE TABLE `accountBalances` (
	`walletAddress` text PRIMARY KEY NOT NULL,
	`totalGranted` real DEFAULT 0 NOT NULL,
	`totalUsed` real DEFAULT 0 NOT NULL,
	`availableBalance` real DEFAULT 0 NOT NULL,
	`syncedAt` text
);
