// Import required modules
import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {

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
            <Bubble 
                {...props}
                wrapperStyle={{
                    right: {
                      backgroundColor: "#C9EEFF",
                    },
                    left: {
                      backgroundColor: "#FFDD83",
                    },
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
                // The quick replies options for the message
                quickReplies: {
                    type: 'checkbox', // or 'radio',
                    values: [
                      {
                        title: 'Yes',
                        value: 'yes',
                      },
                      {
                        title: 'Nope. What?',
                        value: 'no',
                      },
                    ],
                },
                // The user object associated with the message
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any'
                },
                // Add an image prop:
                image: 'https://placeimg.com/140/140/any',
                // Add a video prop:
                video: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                // Mark the message as sent, using one tick
                sent: true,
                // Mark the message as received, using two tick
                received: true,
                // Mark the message as pending with a clock loader
                pending: true,
            }
        ])
    });

    
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