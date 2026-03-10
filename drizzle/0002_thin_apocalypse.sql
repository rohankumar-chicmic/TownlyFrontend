CREATE TABLE `my_properties` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`description` text,
	`location` text NOT NULL,
	`propertyType` text NOT NULL,
	`status` integer DEFAULT 1,
	`annualYieldPercent` real NOT NULL,
	`totalValue` real NOT NULL,
	`pricePerUnit` real NOT NULL,
	`pricePerUnitEth` real,
	`rentalIncomeHistory` real,
	`totalUnits` integer NOT NULL,
	`availableUnits` integer NOT NULL,
	`riskScore` integer,
	`demandScore` integer,
	`imageUrl` text,
	`canDelete` integer DEFAULT false,
	`canEditFullProperty` integer DEFAULT false,
	`canRequestUpdate` integer DEFAULT false,
	`canResubmit` integer DEFAULT false,
	`hasPendingUpdateRequest` integer DEFAULT false,
	`rejectionReason` text
);
--> statement-breakpoint
CREATE TABLE `property_documents` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`propertyId` text NOT NULL,
	`title` text NOT NULL,
	`fileName` text NOT NULL,
	`documentUrl` text NOT NULL,
	FOREIGN KEY (`propertyId`) REFERENCES `my_properties`(`id`) ON UPDATE no action ON DELETE cascade
);
