CREATE TABLE `admins` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`password` text NOT NULL,
	`role` enum('admin','manager','operator') NOT NULL DEFAULT 'operator',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `admins_id` PRIMARY KEY(`id`),
	CONSTRAINT `admins_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `shipments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`trackingCode` varchar(64) NOT NULL,
	`senderDetails` json NOT NULL,
	`receiverDetails` json NOT NULL,
	`packageInfo` json NOT NULL,
	`status` enum('pending','in_transit','delivered','cancelled') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `shipments_id` PRIMARY KEY(`id`),
	CONSTRAINT `shipments_trackingCode_unique` UNIQUE(`trackingCode`)
);
--> statement-breakpoint
CREATE TABLE `trackingEvents` (
	`id` int AUTO_INCREMENT NOT NULL,
	`shipmentId` int NOT NULL,
	`location` varchar(255) NOT NULL,
	`description` text NOT NULL,
	`timestamp` timestamp NOT NULL DEFAULT (now()),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `trackingEvents_id` PRIMARY KEY(`id`)
);
