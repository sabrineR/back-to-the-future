import { createDefaultPreset, type JestConfigWithTsJest } from 'ts-jest';

const tsJestTransformCfg = createDefaultPreset().transform;

/** @type {import("jest").Config} **/
const config: JestConfigWithTsJest = {
    testEnvironment: 'node',
    transform: {
        ...tsJestTransformCfg,
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
    },

    testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
};
export default config;
