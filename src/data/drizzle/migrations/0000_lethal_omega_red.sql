CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(30) NOT NULL,
	"email" varchar(30) NOT NULL,
	"age" numeric NOT NULL,
	"createdAt" date NOT NULL,
	"updatedAt" date NOT NULL
);
