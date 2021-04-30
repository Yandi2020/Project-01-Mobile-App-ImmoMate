import React, { useState, useEffect } from 'react'
import { StyleSheet } from 'react-native'
import MapView from 'react-native-maps'
import { Marker } from 'react-native-maps'

export default function Map({ address }) {
    const [lat, setLat] = useState('');
    const [lng, setLng] = useState('');
    const [err, setErr] = useState('');

    const key = '';
    const location = 'address=' + address;
    
    // async function getGeocode() {
    //     try {
    //         let response = await fetch('https://maps.googleapis.com/maps/api/geocode/json?' + location + key);
    //         let result = await response.json();
    //         let lat = result.data.results[0].geometry.location.lat;
    //         let lng = result.data.results[0].geometry.location.lng;
    //         return { lat, lng }
    //     } catch (error) {
    //         let err = error;
    //         return err;
    //     }
    // }

    function getGeocode() {
        return fetch('https://maps.googleapis.com/maps/api/geocode/json?' + location + key)
            .then(response => { 
                let result = response.json();
                //let latitude = result.data.results[0].geometry.location.lat;
                let latitude = result.results[0].geometry.location.lat;
                setLat(latitude);
                //let longitude = result.data.results[0].geometry.location.lng;
                let longitude = result.results[0].geometry.location.lng;
                setLng(longitude);
            }).catch(error => setErr(error))   
    }
    
    useEffect(() => {
        getGeocode();
    }, []);

    // if(lat && lng){
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
    // }else return null
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: 300,
    },
})


