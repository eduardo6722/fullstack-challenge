import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: [
    "<rootDir>/src/test/polyfills.encoding.ts",
    "<rootDir>/src/test/polyfills.fetch.ts",
  ],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironmentOptions: {
    // Required so MSW resolves its node entry points under jsdom.
    customExportConditions: [""],
  },
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.graphql$": "<rootDir>/src/test/graphqlMock.ts",
    "\\.(css|less|scss)$": "<rootDir>/src/test/styleMock.ts",
    "\\.(png|jpe?g|gif|svg|webp)$": "<rootDir>/src/test/fileMock.ts",
  },
  testMatch: ["**/*.test.(ts|tsx)"],
  collectCoverageFrom: ["src/**/*.{ts,tsx}", "!src/**/*.d.ts", "!src/mocks/**"],
};

export default config;
