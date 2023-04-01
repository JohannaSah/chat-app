import { TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as Location from 'expo-location';


const CustomActions = ({ wrapperStyle, iconTextStyle, onSend }) => {

    //
    const actionSheet = useActionSheet();

    // function that displays an action menu 
    const onActionPress = () => {
        //
        const options = ['Choose from library', 'Take Photograph', 'send Location', 'Cancel'];
        //
        const cancelButtonIndex = options.length -1;
        //
        actionSheet.showActionSheetWithOptions(
            //
            {
                options,
                cancelButtonIndex,
            },
            //
            async (buttonIndex) => {
                //
                switch (buttonIndex) {
                    case 0:
                        console.log('user wants to pick an image');
                        pickImage();
                        return;
                    case 1:
                        console.log('user wants to take a photo');
                        takePhoto();
                        return;
                    case 2:
                        console.log('user wants to get their location');
                        getLocation();
                    default:
                }
            }
        )
    }

    //
    const pickImage = async () => {
        //
        let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        //
        if (permissions?.granted) {
            //
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images // options are images (default, so code not needed), Videos (only videos allowed) and All 
            });
            
            //
            if (!result.canceled) setImage(result.assets[0]);
            //
            else setImage(null);
        }
      }
      
      //
      const takePhoto = async () => {
        // 
        let permissions = await ImagePicker.requestCameraPermissionsAsync();

        //     
        if (permissions?.granted) {
            //
            let result = await ImagePicker.launchCameraAsync();
            
            //
            if (!result.canceled) {
                //
                let mediaLibraryPermissions = await MediaLibrary.requestPermissionsAsync();
                
                //
                if (mediaLibraryPermissions?.granted) await MediaLibrary.saveToLibraryAsync(result.assets[0].uri);
                
                //
                setImage(result.assets[0]);
            }
            //
            else setImage(null);
        }
      }
    
      //
      const getLocation = async () => {
        //
        let permissions = await Location.requestForegroundPermissionsAsync();
        
        //
        if (permissions?.granted) {
            //
            const location = await Location.getCurrentPositionAsync({});
            
            //
            if (location) {
                //
                onSend({
                    //
                    location: {
                        //
                        longitude: location.coords.longitude,
                        //
                        latitude: location.coords.latitude,
                    },
                });
            }
            //
            else {
                Alert.alert('Error occured while fetching location');
            }
        }
        //
        else {
          Alert.alert('Permissions to read location aren´t granted');
        }
      }

    //
    return (
        <TouchableOpacity
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