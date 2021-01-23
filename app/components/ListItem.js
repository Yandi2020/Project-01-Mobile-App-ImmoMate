import React from 'react'
import { StyleSheet, View, Image, TouchableHighlight } from 'react-native'
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../config/colors'
import AppText from '../components/layout/AppText'

export default function ListItem({ 
    image, 
    IconComponent, 
    iconRight,
    title, 
    subTitle, 
    onPress, 
    renderRightActions 
}) {
    return (
        <Swipeable renderRightActions={renderRightActions} >
            <TouchableHighlight underlayColor={colors.light} onPress={onPress} >
                <View style={styles.container}>
                    { image && <Image source={image} style={styles.image} /> }     
                    { IconComponent }

                    <View style={styles.detailsContainer}>
                        <AppText style={styles.title} numberOfLines={1}>{title}</AppText>
                        { subTitle && <AppText style={styles.subTitle} numberOfLines={2}>{subTitle}</AppText>}
                    </View>

                    <MaterialCommunityIcons name={iconRight} size={30} color={colors.medium} />
                </View>
            </TouchableHighlight>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 15,
        alignItems: 'center',
        flexDirection: 'row',
        padding: 15,
        backgroundColor: colors.white,
    },
    detailsContainer: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    image: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 35,
    },
    subTitle: {
        color: colors.medium,
    },
    title: {
        fontWeight: '500',
    },
})

