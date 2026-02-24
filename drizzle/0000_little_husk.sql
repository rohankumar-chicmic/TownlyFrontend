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
	`riskScore` integer NOT NULL,
	`pricePerUnitEth` real NOT NULL,
	`description` text,
	`userOwned` integer DEFAULT false,
	`status` integer
);
