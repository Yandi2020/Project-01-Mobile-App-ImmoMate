import React from 'react'
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'
import AppText from './layout/AppText'

export default function Card({ title, subTitle, image, onPress, icon }) {
    const heart = icon ? 'heart' : 'heart-outline';

    //different ways to acquire images from online eg: http://..... {uri: image.url}
    //or path in your phone eg: "file://....//...." {uri: image.url}
    //or local image path in your project folder eg: require('../assets/img/...') image.url
    const img = typeof image.url === 'string' ? {uri: image.url} : image.url;

    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.card} >
                <Image source={img} style={styles.image} />

                <View style={styles.container}>
                    <AppText style={styles.title} numberOfLines={2}>{title}</AppText>
                    <View style={styles.heartContainer}>
                        <AppText style={styles.subTitle} numberOfLines={3}>{subTitle}</AppText>
                        <MaterialCommunityIcons name={heart} size={30} color={colors.primary} />
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    card: {
        borderRadius: 15,
        backgroundColor: colors.white,
        marginBottom: 20,
        overflow: 'hidden', 
    },
    container: {
        padding: 20,
    },
    heartContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    image: {
        width: '100%',
        height: 200,
    },
    subTitle: {
        color: colors.tertiary,
        fontWeight: 'bold',
    },
    title: {
        marginBottom: 7, 
    },
})

