// Import necessary modules and components
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import the screens we want to navigate
import Start from './components/Start';
import Chat from './components/Chat';

// Create a stack navigator for our screens
const Stack = createNativeStackNavigator();

// Define our App component
export default function App() {
  // Render the NavigationContainer and Stack Navigato
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
            component={Start}
        />
        {/* Renders the Chat component as a screen with a name of 'Chat' */}
        <Stack.Screen 
            name='Chat'
            component={Chat}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// Define styles for our components
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});