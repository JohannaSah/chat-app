// Import required modules
import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

// Define a set of background color options as key-value pairs
const backgroundColors = {
    black: { backgroundColor: "#090C08" },
    blue: { backgroundColor: "#3A98B9" },
    sand: { backgroundColor: "#FFF1DC" },
    lightgrey: { backgroundColor: "#EEEEEE" },
  };

  // Render the Start screen
const Start = ({ navigation }) => {

    // Declare state variables for the user's name and selected background color
    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    //  Updates the selected background color state based on the user's color choice
    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    // Destructure the backgroundColors object to get specific color objects for easier access later on.
    const { black, blue, sand, lightgrey } = backgroundColors;

    return (
        // This View is the main container for the screen
        <View style={styles.container} >
            {/* ImageBackground is used to set the background image for the screen */}
            <ImageBackground 
                source={require('../assets/Background-Image.png')} 
                style={[styles.container, styles.image]}
            >
                {/* Text component that displays the title of the screen */}
                <Text style={styles.title} >
                    Chat App
                </Text>

                {/* inputBox contains TextInput for user to enter their name and choose background color */}
                <View style={styles.inputBox} >
                    <TextInput 
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                    />

                    {/* The colorChoice contains the text that prompts the user to choose a background color */}
                    <View style={styles.colorChoice}>
                        <Text>Choose your background colour</Text>

                        {/* The colorWrapper contains the options for the user to select their background color */}
                        <View style={styles.colorWrapper}>
                            {/* Using TouchableOpacity instead of Button to allow for more flexible styling options and a better user experience on touch screens */}
                            <TouchableOpacity
                                // Provide accessibility for screenreaders
                                accessible={true}
                                accessibilityLabel="black"
                                accessibilityHint="Let’s you set the chat window´s background color to black."
                                accessibilityRole="button"
                                // Styles the pressable background color choice
                                style={[
                                    styles.color, 
                                    black, // Sets the color of the button
                                    color === black.backgroundColor ? styles.colorSelected : {} // Determine if current color is selected, if yes, apply 'colorSelected' style, otherwise apply an empty object
                                ]}
                                // Sets the background color to the chosen one when the color button is pressed
                                onPress={() => handleColorChange(black.backgroundColor)} 
                            />
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="blue"
                                accessibilityHint="Let’s you set the chat window´s background color to blue."
                                accessibilityRole="button"
                                style={[
                                    styles.color,
                                    blue,
                                    color === blue.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(blue.backgroundColor)}
                            />
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="sand"
                                accessibilityHint="Let’s you set the chat window´s background color to sand."
                                accessibilityRole="button"
                                style={[
                                    styles.color,
                                    sand,
                                    color === sand.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(sand.backgroundColor)}
                            />
                            <TouchableOpacity
                                accessible={true}
                                accessibilityLabel="lightygrey"
                                accessibilityHint="Let’s you set the chat window´s background color to lightgrey."
                                accessibilityRole="button"
                                style={[
                                    styles.color,
                                    lightgrey,
                                    color === lightgrey.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(lightgrey.backgroundColor)}
                            />
                        </View>
                    </View>

                    {/* A touchable component that navigates to th Chat screen when pressed */}
                    <TouchableOpacity 
                        accessible={true}
                        accessibilityLabel="Go to chat"
                        accessibilityHint="Button that when clicked takes you to the chat. It will implement your chosen username and backgroundcolor."
                        accessibilityRole="button"
                        // An object containing style rules for the TouchableOpacity component
                        style={styles.button}
                        title='Go to Chat'
                        // A function that navigates to the specified screen while giving it the typed in name and the chosen background color
                        onPress={ () => navigation.navigate('Chat', {name: name, color: color}) }
                    >
                        <Text> Start Chatting </Text>
                    </TouchableOpacity>

                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    /* Entire screen */
    container: {
        flex: 1,
    },
    /* Entire screen -> background*/
    image: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    /* title*/
    title: {
        fontSize: 50,
        fontWeight: '600',
        marginTop: 60,
        marginBottom: 20,
        color: 'black'
    },
    /* Input Box Styles */
    /* Input Box Styles -> container */
    inputBox: {
        backgroundColor: '#fff',
        opacity: 0.7,
        marginBottom: '25%',
        padding: '10%',
        height: 250,
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 4,
    },
    /* Input Box Styles -> input field */
    textInput: {
        height: 50,
        width: '88%',
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 4,
        color: '#757083',
        fontSize: 16,
        fontWeight: '300',
        paddingLeft: 10,
    },
    /* Input Box Styles -> color container */
    colorChoice: {
        marginTop: 10,
        marginBottom: 10,
        alignItems: "center",
    },
    /* Input Box Styles -> color button container */
    colorWrapper: {
        marginTop: 20,
        width: "100%",
        flexDirection: 'row',
        alignItems: "center",        
        justifyContent: 'space-around' 
    },
    /* Input Box Styles -> color buttons */
    color: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
    /* Input Box Styles -> selected color button  */
    colorSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5f5f5f",
    },
    /* Input Box Styles -> chat button*/
    button: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 10,
    }
});

export default Start;