import React from 'react'
import { StyleSheet } from 'react-native'

import AppText from './AppText'
import colors from '../../config/colors';

export default function ErrorMessage({ error, visible, color='danger' }) {
    if(!visible || !error) return null;

    return (
        <AppText style={[styles.error, {color: colors[color]}]}>{error}</AppText>
    )
}

const styles = StyleSheet.create({
    error: {
        color: colors.danger,
    },
})

