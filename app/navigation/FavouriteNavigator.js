import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import FavouriteScreen from '../screens/FavouriteScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen';

const Stack = createStackNavigator();

const FavouriteNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Favourite' component={FavouriteScreen} />
        <Stack.Screen name='Details' component={ListingDetailsScreen} />
    </Stack.Navigator>
);

export default FavouriteNavigator;

