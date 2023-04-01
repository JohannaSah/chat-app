// Import necessary modules and components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect } from "react";
import { LogBox, Alert } from "react-native";

// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator for our screens
const Stack = createNativeStackNavigator();

// Ignores logs containing "AsyncStorage has been extracted from"
LogBox.ignoreLogs(["AsyncStorage has been extracted from"]);

// Define our App component
export default function App() {
  
  // Define a new state thart represents the network connectivity status
  const connectionStatus = useNetInfo();

  // Display an alert if connection is lost
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyCf_pY6vfGkh5n1RVHrjFSx6Ox9QGRiooc",
    authDomain: "chat-app-496c8.firebaseapp.com",
    projectId: "chat-app-496c8",
    storageBucket: "chat-app-496c8.appspot.com",
    messagingSenderId: "237640187394",
    appId: "1:237640187394:web:5591698741158974f2f11b",
    measurementId: "G-TW06STK5RB"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);


  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app); 
  

  // Initialize handler for Firebase Storage
   const storage = getStorage(app);

  // Render the NavigationContainer and Stack Navigator
  return (
    // Set up the navigation container
    <NavigationContainer>
      {/* Set up Stack navigator */}
      <Stack.Navigator
        initialRouteName='Start'
      >
        {/* Renders the Start component as a screen with a name of 'Start' */}
        <Stack.Screen 
            name='Start'
        >
          {props => <Start db={db} {...props} />}
        </Stack.Screen>
        {/* Renders the Chat component as a screen with a name of 'Chat' */}
        <Stack.Screen
         name="Chat"
       >
         {props => 
          <Chat 
            isConnected={connectionStatus.isConnected} 
            db={db} 
            storage={storage}
            {...props} 
          />
         }
       </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}