import { useState, useEffect } from 'react'
import { Alert } from 'react-native'
import * as Location from 'expo-location'

export default useLocation = (address) => {
    const [location, setLocation] = useState(null);
    
    const getLocation = async () => {
        try {
            const { granted } = await Location.requestPermissionsAsync();
            if(!granted) return Alert('You need to enable permission to load Maps');
    
            let result = await Location.geocodeAsync(address);
            //destructure properly as follow
            const [{ latitude, longitude }] = result;
            setLocation({latitude, longitude});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getLocation();
    }, []);
    
    return location; 
}



