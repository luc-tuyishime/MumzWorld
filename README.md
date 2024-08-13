# MumzWorld

MumzWorld is the original, number 1, and largest destination in the Middle East for everything Mum, Baby, and Child. This mobile application brings the MumzWorld experience to your fingertips.

![WhatsApp Image 2024-08-13 at 11 10 15 (1)](https://github.com/user-attachments/assets/999b479f-2aba-486e-8533-8e7e568e525e)
![WhatsApp Image 2024-08-13 at 10 50 37](https://github.com/user-attachments/assets/97ca2e7d-a689-49f1-9167-b6b634b19fee)


https://github.com/user-attachments/assets/dced0656-0a8f-4ca5-8af3-333245273fcd


## Deployment

Here is the Expo working deployment

* For Android users, you can download the APK file here:

    - [MumzWorld APK Url](https://drive.google.com/drive/folders/1FCDK42sPnru-Es2fQyFjIVuydoDRrgHB?usp=sharing)

* IOS
- I couldn't deploy the app on iOS because it requires a paid Apple Developer account.


## Technology Stack

- **Language**: TypeScript
- **Framework**: React Native
- **Styling**: TailwindCSS
- **Testing**: @testing-library/react-native
- **Style Guide**: Airbnb
- **Linting**: ESLint
- **Code Formatting**: Prettier

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (LTS version recommended)
- Yarn package manager
- Expo CLI (installed globally)

## Getting Started

To run the app locally, follow these steps:

1. Clone the repository:
   ```
   git clone https://github.com/luc-tuyishime/MumzWorld.git
   cd MumzWorld
   ```

2. Install dependencies:
   ```
   yarn install
   ```

3. Start the Expo development server:
   ```
   npx expo start --clear
   ```

4. Use the Expo Go app on your mobile device to scan the QR code from the terminal to launch the app.

## Testing

To run the tests, use the following command:

```
yarn test
```

## Style Guide

## Architecture Decisions and Trade-offs

### Redux Toolkit

We chose Redux Toolkit for state management due to its simplicity and built-in best practices. It reduces boilerplate code and provides a standardized way to write Redux logic.
This project follows the Airbnb JavaScript Style Guide. ESLint and Prettier are configured to enforce this style guide.

Trades-offs:

- Pros: Simplified Redux setup, built-in immutability with Immer, automatic handling of common use cases.
- Cons: Adds some bundle size, may be overkill for very simple applications.

```
.addCase(fetchProducts.fulfilled, (state, action: PayloadAction<Product[]>) => {
    state.status = 'succeeded';
    state.byId = {};
    state.allIds = [];
    action.payload.forEach(product => {
        state.byId[product.id] = product;
        state.allIds.push(product.id);
    });
```

This code demonstrates how Redux Toolkit simplifies state updates:

- It uses `createSlice` and `createAsyncThunk` to handle async actions.
- The state can be mutated directly thanks to Immer, which is built into Redux Toolkit.
- It normalizes the data structure for efficient access and updates.

## CustomHeader Component

We created a CustomHeader component to encapsulate the header logic and make it reusable across different screens.
Trade-offs:

- Pros: Reusability, consistency across the app, easier maintenance.
- Cons: Might be less flexible for highly specific header requirements on certain screens.

## TypeScript

- TypeScript was chosen for its strong typing system, which helps catch errors early in the development process

Trade-offs:

- Pros: Improved code quality, better IDE support, easier refactoring.
- Cons: Steeper learning curve, additional setup time, slightly more verbose code.

## Tailwind CSS

Tailwind CSS was selected for rapid UI development and consistent styling.

Trade-offs:

Pros: Fast development, consistent design system, highly customizable.
Cons: Steeper learning curve, potential for longer class names in JSX.

## Jest for Testing

Jest was chosen as the testing framework for its simplicity and integration with React Native.

Trade-offs:

- Pros: Built-in mocking capabilities, snapshot testing, good performance.
- Cons: Might require additional setup for certain React Native components.






