import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

import colors from '../config/colors'

export default function WelcomeScreen({ navigation }) {
    return (
            <View style={styles.Container}>
                <Image style={styles.logo} source={require('../../assets/Logo-IM-light.png')} /> 
                <Text style={styles.tagline}>Land to Your Sweet Home</Text>
            </View>
    )
}

const styles = StyleSheet.create({ 
    Container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primary,
    },
    logo: {
        width: 155,
        height: 100,
    },
    tagline: {
        color: colors.white,
        fontSize: 25,
        fontWeight: '600',
        paddingVertical: 20
    },
})

