# React Native Chat App

This is a chat app for mobile devices built with React Native. The app provides users with a chat interface and options to share images and their location.

## Description

### The 5 Ws

1. Who — The users of the mobile chat app. These could be friends, family, or other students on this course. Your codebase will be used by other developers working on the product.

2. What — A native chat app built with React Native, as well as all the relevant documentation.

3. When—Whenever users of your chat app want to communicate with each other.

4. Where — The app will be optimized for both Android and iOS devices. You will use Expo to develop the app and Google Firestore to store the chat messages.

5. Why — Mobile chat apps are among the most commonly downloaded and used apps in the world, so knowing how to build a chat app is an indispensable skill. The app will demonstrate your React Native development skills.

### Features and Requirements

#### User Stories

- As a new user, I want to be able to easily enter a chat room so I can quickly start talking to my friends and family.
- As a user, I want to be able to send messages to my friends and family members to exchange the latest news.
- As a user, I want to send images to my friends to show them what I’m currently doing.
- As a user, I want to share my location with my friends to show them where I am.
- As a user, I want to be able to read my messages offline so I can reread conversations at any time.
- As a user with a visual impairment, I want to use a chat app that is compatible with a screen reader so that I can engage with a chat interface.

#### Key Features

- A page where users can enter their name and choose a background color for the chat screen before joining the chat.
- A page displaying the conversation, as well as an input field and submit button.
- The chat must provide users with two additional communication features: sending images and location data.
- Data gets stored online and offline.

#### Technical Requirements

- The app must be written in React Native.
- The app must be developed using Expo.
- The app must be styled according to the given screen design.
- Chat conversations must be stored in Google Firestore Database.
- The app must authenticate users anonymously via Google Firebase authentication.
- Chat conversations must be stored locally.
- The app must let users pick and send images from the phone’s image library.
- The app must let users take pictures with the device’s camera app, and send them.
- The app must store images in Firebase Cloud Storage.
- The app must be able to read the user’s location data.
- Location data must be sent via the chat in a map

## Setup

### Built with

- [React Native](https://reactnative.dev/)
- [React Native Gifted Chat](https://github.com/FaridSafi/react-native-gifted-chat)
- [Expo](https://expo.dev/)
- [Firebase including Firestore](https://firebase.google.com/)

### Development environment

- Install Expo CLI: npm install expo-cli -g and login with your Expo account using expo login
- Install necessary procet dependencies: npm i
- Install the Expo Go App from Apple Store or Google Play Store to test the project on your mobile device
- Install Android Studio for Android Emulator or Xcode for ios Simulator to test the app

### Setting up your database

- Sign in at Google Firebase
- Create a new project in test mode
- In there create a Firestore Database
- At 'Settings' -> 'General' -> 'Your apps' -> 'Firestore for Web' generate your configuration object.
- In the `App.js` file replace the `firebaseConfig` variable with the configuration info from your own Firestore database:

```js
    firebase.initializeApp({
    apiKey: "your-api-key",
    authDomain: "your-authdomain",
    projectId: "your-project-id",
    storageBucket: "your-storage-bucket",
    messagingSenderId: "your-messaging-sender-id",
    appId: "your-app-id",
    });
```

### Run the project

- Start the app by running `npx expo start` or `expo start`
- Using the Expo Go app start inTouch by scanning the QR code in your terminal
- Using the Emulator/Simulator press `a` for Android or `i` for ios, `w` for web

### Dependencies

```json
{
    "@expo/react-native-action-sheet": "^4.0.1",
    "@expo/webpack-config": "^18.0.1",
    "@react-native-async-storage/async-storage": "1.17.11",
    "@react-native-community/netinfo": "9.3.7",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/native-stack": "^6.9.12",
    "expo": "~48.0.9",
    "expo-camera": "~13.2.1",
    "expo-image-picker": "~14.1.1",
    "expo-location": "~15.1.1",
    "expo-media-library": "~15.2.3",
    "expo-status-bar": "~1.4.4",
    "firebase": "^9.13.0",
    "react": "18.2.0",
    "react-dom": "^18.2.0",
    "react-native": "0.71.4",
    "react-native-gifted-chat": "^2.0.1",
    "react-native-maps": "1.3.2",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "react-native-web": "~0.18.11"
  }
```