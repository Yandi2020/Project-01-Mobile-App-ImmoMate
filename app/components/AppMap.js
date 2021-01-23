import React from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

export default function AppMap({ lat, lng }) {
        return(
            <MapView
                initialRegion={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
                }}
                style={styles.map}
            >
                <Marker 
                    coordinate={{ latitude: lat, longitude: lng }} 
                    image={require('../../assets/home.png')}
                />
            </MapView>
        )
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 300,
        marginBottom: 20,
    },
})

