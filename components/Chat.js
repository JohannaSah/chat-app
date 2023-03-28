// Import required modules
import { useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Chat = ({ route, navigation }) => {

    // Destructure name and color from route params
    const { name, color } = route.params;

    // Set the navigation title to the name using useEffect hook
    useEffect( () => {
        navigation.setOptions({ title : name }, );
    }, []);

    // Render the Chat screen with background color and text
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        <Text>
            Hello Chat
        </Text>
      </View>
    );
   }

   const styles = StyleSheet.create({
    /* Entire screen */
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
   });

   export default Chat;