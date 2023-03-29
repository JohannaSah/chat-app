// Import required modules
import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';

const Chat = ({ route, navigation }) => {

    // Destructure name and color from route params
    const { name, color } = route.params;
    
    //
    const [messages, setMessages] = useState([]);

    //
    const onSend = (newMessages) => {
        setMessages(previousMessages => GiftedChat.append(previousMessages, newMessages))
    }

     // Set the navigation title to the name using useEffect hook
     useEffect( () => {
        navigation.setOptions({ title : name }, );
    }, []);


    // Set up structure for gifted chat messages
    useEffect ( () => {
        setMessages([
            {
                _id: 1,
                text: 'Hello developer',
                createdAt: new Date(),
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