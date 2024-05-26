import { date, numeric, pgTable, uuid, varchar } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const usersTable = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 30 }).notNull(),
  email: varchar('email', { length: 30 }).notNull(),
  age: numeric('age').notNull(),
  createdAt: date('createdAt').notNull(),
  updatedAt: date('updatedAt').notNull(),
});

export const groupsTable = pgTable('groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: varchar('name', { length: 30 }).notNull(),
});

export type User = typeof usersTable.$inferSelect;

// Schema for inserting a user - can be used to validate API requests
export const insertUserSchema = createInsertSchema(usersTable);
// Schema for selecting a user - can be used to validate API responses
export const selectUserSchema = createSelectSchema(usersTable);
