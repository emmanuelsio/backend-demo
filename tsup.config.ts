import { defineConfig } from 'tsup';

export default defineConfig({
  entry: [
    'src',
    '!src/**/*.sql',
    '!src/**/__tests__/**',
    '!src/**/__tests__/*.test.*',
    '!src/**/migrations/*.*',
    '!src/**/drizzle/*.js',
  ],
  splitting: false,
  sourcemap: true,
  clean: true,
});
