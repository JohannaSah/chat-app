// Import necessary modules and components
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator for our screens
const Stack = createNativeStackNavigator();

// Define our App component
export default function App() {
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
         {props => <Chat db={db} {...props} />}
       </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}