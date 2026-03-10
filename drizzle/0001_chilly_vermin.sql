CREATE TABLE `blog_posts` (
	`id` int AUTO_INCREMENT NOT NULL,
	`slug` varchar(200) NOT NULL,
	`title` varchar(300) NOT NULL,
	`excerpt` text,
	`content` text,
	`category` varchar(100),
	`tags` text,
	`metaTitle` varchar(300),
	`metaDescription` text,
	`published` boolean NOT NULL DEFAULT false,
	`publishedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `contact_messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(30),
	`subject` varchar(300),
	`message` text NOT NULL,
	`read` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `contact_messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `contractor_signups` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(200) NOT NULL,
	`phone` varchar(30) NOT NULL,
	`email` varchar(320),
	`trade` varchar(100) NOT NULL,
	`availability` varchar(100) NOT NULL,
	`serviceArea` varchar(200) NOT NULL,
	`yearsExperience` varchar(20),
	`notes` text,
	`status` enum('pending','active','inactive') NOT NULL DEFAULT 'pending',
	`rating` decimal(3,2),
	`jobsCompleted` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contractor_signups_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `service_requests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`propertyAddress` text NOT NULL,
	`serviceType` varchar(100) NOT NULL,
	`deadline` varchar(50),
	`contactName` varchar(200) NOT NULL,
	`contactPhone` varchar(30) NOT NULL,
	`contactEmail` varchar(320) NOT NULL,
	`notes` text,
	`photoUrls` text,
	`status` enum('pending','assigned','completed','cancelled') NOT NULL DEFAULT 'pending',
	`assignedContractorId` int,
	`quoteAmount` decimal(10,2),
	`invoiceAmount` decimal(10,2),
	`paymentStatus` enum('unpaid','partial','paid') NOT NULL DEFAULT 'unpaid',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `service_requests_id` PRIMARY KEY(`id`)
);
