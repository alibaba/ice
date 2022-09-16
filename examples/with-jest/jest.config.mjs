import { defineJestConfig } from '@ice/app';

export default defineJestConfig({
  preset: 'ts-jest',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.ts'],
  testEnvironment: 'jest-environment-jsdom',
});
