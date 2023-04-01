import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { uploadBytes, ref, getDownloadURL } from 'firebase/storage';



const CustomActions = ({ wrapperStyle, iconTextStyle, onSend, storage, userID }) => {

    // The action sheet component provided by the `useActionSheet` hook
    const actionSheet = useActionSheet();

    // function that displays an action menu 
    const onActionPress = () => {

        // An array of options to display in the action sheet
        const options = ['Choose from library', 'Take Photograph', 'send Location', 'Cancel'];
        // The index of the "Cancel" option in the options array
        const cancelButtonIndex = options.length -1;
        
        // Show the action sheet with the given options and a callback function that handles the selected option 
        actionSheet.showActionSheetWithOptions(
            // The configuration object for the action sheet
            {
                options,
                cancelButtonIndex,
            },
            // The callback function for handling the selected option
            async (buttonIndex) => {
                // A switch statement to handle the selected option
                switch (buttonIndex) {
                    // If "Choose from library" is selected
                    case 0:
                        console.log('user wants to pick an image');
                        pickImage();
                        return;
                    // If "Take Photograph" is selected
                    case 1:
                        console.log('user wants to take a photo');
                        takePhoto();
                        return;
                    // If "send Location" is selected
                    case 2:
                        console.log('user wants to get their location');
                        getLocation();
                    // If "Cancel" is selected, do nothing
                    default:
                }
            }
        )
    }

    // Uploads the image to the storage service and sends it as a message
    const uploadAndSendImage = async (imageURI) => {

        // Generate a unique reference string for the new uploa
        const uniqueRefString = generateReference(imageURI);

        // Create a new reference for the upload using the generated string
        const newUploadRef = ref(storage, uniqueRefString);

        // Fetch the image data from the URI
        const response = await fetch(imageURI);

        // Convert the fetched data to a blob object
        const blob = await response.blob();

         // Upload the blob to the new reference and send the image URL as a message
        uploadBytes(newUploadRef, blob).then(async (snapshot) => {
            console.log('File has been uploaded successfully');
            // Obtains the download URL for the uploaded image from Firebase Storage
            const imageURL = await getDownloadURL(snapshot.ref)
            // Sends the message with the image URL to the chat room
            onSend({ image: imageURL })
        });

    }

    // Displays the image library and uploads the selected image
    const pickImage = async () => {

        // Request permissions to access the image library
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissions?.granted) {
            // Launch the image library and allow user to select an image
            let result = await ImagePicker.launchImageLibraryAsync();
            
            // If an image is selected, upload it to the storage service and send it as a message
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);

            else Alert.alert("Permissions haven't been granted.");
            
        }
    }
      
    // Displays the camera and uploads the taken photo
    const takePhoto = async () => {
        
        let permissions = await ImagePicker.requestCameraPermissionsAsync();
  
        if (permissions?.granted) {
            // Launch the camera
            let result = await ImagePicker.launchCameraAsync();
            
            // If photo taken, upload and send image          
            if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);

            else Alert.alert("Permissions haven't been granted.");
        }
    }

    // Gets the current location and sends it as a message
    const getLocation = async () => {
        
        let permissions = await Location.requestForegroundPermissionsAsync();
        
        
        if (permissions?.granted) {

            //Get current location
            const location = await Location.getCurrentPositionAsync({});
            
            if (location) {
                // Send location as a message
                onSend({
                    // Location object with longitude and latitude
                    location: {
                        longitude: location.coords.longitude,
                        latitude: location.coords.latitude,
                    },
                });
            }
            else {
                Alert.alert('Error occured while fetching location');
            }
        }
        else {
            Alert.alert('Permissions to read location aren´t granted');
        }
    }
    
    // Generates a unique reference string for an image based on the user ID, current timestamp, and image name
    const generateReference = (uri) => {

        // Get the current timestamp
        const timestamp = (new Date()).getTime();

        // Extract the image name from the uri by splitting it by '/' and taking the last part of the resulting array
        const imageName = uri.split('/')[uri.split('/').length -1];
        
        // Combine the user ID, timestamp, and image name to create a unique reference string
        return `${userID}-${timestamp}-${imageName}`;
    }

    // Render a button that provides the user with options to send different types of messages
    return (
        <TouchableOpacity
            // Provide accessibility for screenreaders
            accessible={true}
            accessibilityLabel="action"
            accessibilityHint="Let’s you choose to send either, image, photo or location as message or to cancel the process of choosing something other than text to send."
            accessibilityRole="button"
            style={styles.container}
            onPress={onActionPress}
        >
            <View
                style={[styles.wrapper, wrapperStyle]}
            >
                <Text
                    style={[styles.iconText, iconTextStyle]}
                > 
                    + 
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        width: 26,
        height: 26,
        marginLeft: 10,
        marginBottom: 10,
      },
      wrapper: {
        borderRadius: 13,
        borderColor: '#b2b2b2',
        borderWidth: 2,
        flex: 1,
      },
      iconText: {
        color: '#b2b2b2',
        fontWeight: 'bold',
        fontSize: 10,
        backgroundColor: 'transparent',
        textAlign: 'center',
      },
});

export default CustomActions;