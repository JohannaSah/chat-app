// Import required modules
import React, { useEffect, useState } from 'react';
import { collection, onSnapshot, addDoc, query, orderBy } from '@firebase/firestore';
import { StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, Text, Platform } from 'react-native';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';


const Chat = ({ db, route, navigation }) => {

    // Destructure userID, name and color from route params
    const { userID, name, color } = route.params;
    
    // Represents the state variable that stores the messages in the chat
    const [messages, setMessages] = useState([]);

    // Updates the messages state variable by appending new messages to the existing ones
    const onSend = (newMessages) => {
        console.log("New messages:", newMessages);
        addDoc(collection(db, "messages"), newMessages[0])
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
    useEffect ( () =>  {
        // Query the Firestore collection 'messages' and order them by 'createdAt' field in descending order
        const q = query(collection(db, "messages"), orderBy("createdAt", "desc"));

         // Set up a snapshot listener that listens for changes in the 'messages' collection
        const unsubMessages = onSnapshot( q, (documentsSnapshot) => {
            // Create an empty array to hold the new messages
            let newMessages = [];
            // Loop through each document in the snapshot
            documentsSnapshot.forEach( doc => {
                // Push each document's data into the newMessages array as a new message object
                newMessages.push({
                    // Set the message ID to the document ID
                    id: doc.id, 
                     // Spread the rest of the document data into the message object
                    ...doc.data(),
                    // Convert the 'createdAt' timestamp to a Date object and set it as a property of the message object
                    createdAt: new Date(doc.data().createdAt.toMillis())
                });
            });

            // Update the 'messages' state variable with the newMessages array
            setMessages(newMessages);
        });

        // Unsubscribe from the snapshot listener when the component unmounts
        return () => {
            if (unsubMessages) unsubMessages();
        }
        
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
            onSend={onSend}
            // user._id - The unique ID of the current user
            user={{
                _id: userID,
                name: name,
                avatar: 'https://example.com/avatar.png',
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