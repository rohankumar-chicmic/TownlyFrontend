CREATE TABLE `offlinePropertyDrafts` (
	`id` text PRIMARY KEY NOT NULL,
	`propertyName` text NOT NULL,
	`description` text NOT NULL,
	`location` text NOT NULL,
	`propertyType` text NOT NULL,
	`documents` text NOT NULL,
	`totalPropertyValue` real NOT NULL,
	`numberOfShares` integer NOT NULL,
	`rentalIncome` real NOT NULL,
	`expectedAnnualYield` real NOT NULL,
	`propertyImage` blob NOT NULL,
	`updatedAt` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `offline_tasks` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`payload` text NOT NULL,
	`status` text DEFAULT 'pending',
	`retries` integer DEFAULT 0,
	`created_at` integer NOT NULL
);
