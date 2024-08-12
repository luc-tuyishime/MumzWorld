module.exports = {
    preset: 'jest-expo',
    setupFiles: ['<rootDir>/jest.setup.js'],
    transformIgnorePatterns: [
        'node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@unimodules/.*|unimodules|sentry-expo|native-base|react-native-svg)'
    ],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
    setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
    testMatch: ['**/__tests__/**/*.test.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
    collectCoverageFrom: [
        '**/*.{js,jsx,ts,tsx}',
        '!**/coverage/**',
        '!**/node_modules/**',
        '!**/babel.config.js',
        '!**/jest.setup.js'
    ],
    globals: {
        'ts-jest': {
            tsconfig: {
                jsx: 'react'
            }
        }
    }
};
