import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ImageBackground } from 'react-native';

const backgroundColors = {
    black: { backgroundColor: "#090C08" },
    blue: { backgroundColor: "#3A98B9" },
    sand: { backgroundColor: "#FFF1DC" },
    lightgrey: { backgroundColor: "#EEEEEE" },
  };

const Start = ({ navigation }) => {

    const [name, setName] = useState('');
    const [color, setColor] = useState('');

    const handleColorChange = (newColor) => {
        setColor(newColor);
    };

    const { black, blue, sand, lightgrey } = backgroundColors;

    return (
        <View style={styles.container} >
            <ImageBackground 
                source={require('../assets/Background-Image.png')} 
                style={[styles.container, styles.image]}
            >
                <Text style={styles.title} >
                    Chat App
                </Text>

                <View style={styles.inputBox} >
                    <TextInput 
                        style={styles.textInput}
                        value={name}
                        onChangeText={setName}
                        placeholder='Type your username here'
                    />


                    <View style={styles.colorChoice}>
                        <Text>Choose your background colour</Text>

                        <View style={[styles.colorWrapper, styles.colors]}>
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    black,
                                    color === black.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(black.backgroundColor)}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    blue,
                                    color === blue.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(blue.backgroundColor)}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    sand,
                                    color === sand.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(sand.backgroundColor)}
                            />
                            <TouchableOpacity
                                style={[
                                    styles.color,
                                    lightgrey,
                                    color === lightgrey.backgroundColor ? styles.colorSelected : {}
                                ]}
                                onPress={() => handleColorChange(lightgrey.backgroundColor)}
                            />
                        </View>
                    </View>

                    <TouchableOpacity style={styles.button} 
                        title='Go to Chat'
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
    container: {
        flex: 1,
    },
    image: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    title: {
        fontSize: 50,
        fontWeight: '600',
        marginTop: '25%',
        color: 'black'
    },
    inputBox: {
        backgroundColor: '#fff',
        opacity: 0.7,
        marginBottom: '25%',
        padding: '10%',
        height: '50%',
        width: '88%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 20,
        borderRadius: 4,
    },
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
    colorChoice: {
        marginTop: 10,
        marginBottom: 10,
    },
    colorWrapper: {
        marginTop: 20,
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
    },
    colors:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    color: {
        borderRadius: 20,
        height: 40,
        width: 40,
    },
    colorSelected: {
        borderStyle: "solid",
        borderWidth: 2,
        borderColor: "#5f5f5f",
    },
    button: {
        alignItems: 'center',
        backgroundColor: 'lightgrey',
        padding: 10,
        borderRadius: 10,
        borderColor: 'black',
        borderWidth: 1,
        marginTop: 30,
    }
});

export default Start;