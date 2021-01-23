import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import PostedScreen from '../screens/PostedScreen'
import ListingDetailsScreen from '../screens/ListingDetailsScreen';

const Stack = createStackNavigator();

const PostedNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Posted Home' component={PostedScreen} />
        <Stack.Screen name='Details' component={ListingDetailsScreen} />
    </Stack.Navigator>
);

export default PostedNavigator;

