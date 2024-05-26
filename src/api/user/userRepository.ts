import { eq } from 'drizzle-orm';

import { User } from '@/api/user/userModel';
import { db } from '@/data/drizzle/db';
import { usersTable } from '@/data/drizzle/schema';

export const userRepository = {
  findAllAsync: async (): Promise<User[]> => {
    const usersDB = await db.select().from(usersTable);
    return usersDB;
  },

  findByIdAsync: async (id: string): Promise<User | null> => {
    const user = await db.select().from(usersTable).where(eq(usersTable.id, id)).limit(1);
    return user[0];
  },
};
