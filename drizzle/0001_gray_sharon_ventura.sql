PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_featuredProperties` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`location` text NOT NULL,
	`imageUrl` text NOT NULL,
	`propertyType` text NOT NULL,
	`annualYieldPercent` real NOT NULL,
	`approvedValuation` real NOT NULL,
	`availableUnits` integer NOT NULL,
	`totalUnits` integer NOT NULL,
	`riskScore` real NOT NULL,
	`pricePerUnitEth` real NOT NULL,
	`description` text,
	`userOwned` integer DEFAULT false,
	`status` integer
);
--> statement-breakpoint
INSERT INTO `__new_featuredProperties`("id", "name", "location", "imageUrl", "propertyType", "annualYieldPercent", "approvedValuation", "availableUnits", "totalUnits", "riskScore", "pricePerUnitEth", "description", "userOwned", "status") SELECT "id", "name", "location", "imageUrl", "propertyType", "annualYieldPercent", "approvedValuation", "availableUnits", "totalUnits", "riskScore", "pricePerUnitEth", "description", "userOwned", "status" FROM `featuredProperties`;--> statement-breakpoint
DROP TABLE `featuredProperties`;--> statement-breakpoint
ALTER TABLE `__new_featuredProperties` RENAME TO `featuredProperties`;--> statement-breakpoint
PRAGMA foreign_keys=ON;