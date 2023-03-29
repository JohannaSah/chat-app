// Import required modules
import { useEffect, useState } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Text } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ db, route, navigation }) => {

    // Destructure name and color from route params
    const { name, color } = route.params;
    
    // Represents the state variable that stores the messages in the chat
    const [messages, setMessages] = useState([]);

    // Updates the messages state variable by appending new messages to the existing ones
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    };

    // Renders a chat bubble with a custom background color based on whether the message is sent by the user or received by the user
    const renderBubble = (props) => {
        return (
            // The Bubble component that contain the sent messages
            <Bubble 
                 // Spread all the props passed to the renderBubble function
                {...props}
                // Set the styles for the chat bubble wrapper based on whether it's on the right or left
                wrapperStyle={{
                    right: {
                      backgroundColor: "#E1EEDD",
                      
                    },
                    left: {
                      backgroundColor: "#ECF2FF",
                    },
                }}
                // Set the text style for the text inside the chat bubble
                textStyle={{
                    right: {
                      color: "black"
                    },
                    left: {
                      color: "black"
                    }
                }}
            />
        )
    };

    // Set the navigation title to the name using useEffect hook
     useEffect( () => {
        navigation.setOptions({ title : name }, );
    }, []);


    // Set up structure for gifted chat messages
    useEffect ( () => {
        setMessages([
            {
                // Unique identifier for the message
                _id: 1,
                // The text content of the message
                text: 'Hello developer',
                // The timestamp indicating when the message was created
                createdAt: new Date(),
                // The user object associated with the message
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placehold.co/600x400/000000/FFFFFF/png'
                },
                // Add an image prop:
                image: 'https://placehold.co/600x400/000000/FFFFFF/png',
                // Mark the message as sent, using one tick
                sent: true,
                // Mark the message as received, using two tick
                received: true,
                // Mark the message as pending with a clock loader
                pending: true,
            },
            {
                _id: 2,
                text: 'This is a system message',
                createdAt: new Date(),
                system: true,
              },
        ])
    }, []);

    
    // Render the Chat screen with background color and text
    return (
      <View style={[styles.container, {backgroundColor: color}]}>
        {/* A component that renders a chat interface using the GiftedChat library */}
        <GiftedChat
            // An array of message objects to be displayed in the chat
            messages={messages}
            // A function that renders the chat bubbles for each message
            renderBubble={renderBubble}
            // A callback function that is called when the user sends a new message
            onSend={messages => onSend(messages)}
            // user._id - The unique ID of the current user
            user={{
                _id: 1
            }}
        />

        {/* A component thatprevents the keyboard from hiding the message input field */}
        {
            Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null
        }

        {/* A touchable component that navigates to th Start screen when pressed */}
        <TouchableOpacity 
            // Provide accessibility for screenreaders
            accessible={true}
            accessibilityLabel="Leave chat"
            accessibilityHint="Let’s you  leave the chat and return to the start screen."
            accessibilityRole="button"
            // An object containing style rules for the TouchableOpacity component
            style={styles.button}
            title='Go to Start'
            // A function that navigates to the specified screen while giving it the typed in name and the chosen background color
            onPress={ () => navigation.navigate('Start') }
        >
            <Text> Leave Chat </Text>
        </TouchableOpacity>
      </View>
    );
   }

   const styles = StyleSheet.create({
    /* Entire screen */
    container: {
      flex: 1
    },
    /* Styles Leave Chat button  */
    button: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderColor: 'black',
        borderWidth: 1,
    }
   });


   export default Chat;