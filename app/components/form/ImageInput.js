import React, { useEffect } from 'react'
import { StyleSheet, View, Image, TouchableWithoutFeedback, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'

import colors from '../../config/colors'

export default function ImageInput({ imageUri, onChangeImage }) {
    //01. ask user permission to access images
    useEffect(() => {
        requestPermission();
    }, []);

    const requestPermission = async() => {
        const result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if(!result.granted)
          alert('You need to enable permission to access the library');
    }

    //02. launch image library 
    const selectImage = async () => {
        try {
          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
          });
          if(!result.cancelled) onChangeImage(result.uri);
        } catch (error) {
          console.log('error in access image', error);
        }
    }

    //03. add or delete image 
    const handlePress = () => {
        if(!imageUri) selectImage();

        else Alert.alert('Delete', 'Are you sure you want to delete this image?', [
            { text: 'Yes', onPress: () => onChangeImage() },
            { text: 'No' },
        ]);
    }

    return (
        <TouchableWithoutFeedback onPress={handlePress}>
            <View style={styles.container}>
                { !imageUri && <MaterialCommunityIcons name='camera' size={40} color={colors.medium}/> }
                { imageUri && <Image source={{uri: imageUri}} style={styles.image}/> }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderRadius: 15, 
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        width: 100, 
        overflow: 'hidden',  
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

