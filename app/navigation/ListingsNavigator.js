import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import ListingsScreen from '../screens/ListingsScreen';
import ListingDetailsScreen from '../screens/ListingDetailsScreen';
import AuthNavigator from './AuthNavigator';

const Stack = createStackNavigator();

const ListingsNavigator = () => (
    <Stack.Navigator mode='modal' screenOptions={{headerShown: false}}>
        <Stack.Screen name='Listings' component={ListingsScreen} />
        <Stack.Screen name='Details' component={ListingDetailsScreen} />
    </Stack.Navigator>
);

export default ListingsNavigator;

