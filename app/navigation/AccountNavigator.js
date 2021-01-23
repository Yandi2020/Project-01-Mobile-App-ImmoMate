import React from 'react';
import { createStackNavigator } from '@react-navigation/stack'

import AccountScreen from '../screens/AccountScreen';
import FavouriteNavigator from './FavouriteNavigator'
import FeedbackScreen from '../screens/FeedbackScreen'
import PostedNavigator from '../navigation/PostedNavigator'
import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'

const Stack = createStackNavigator();

const AccountNavigator = () => (
    <Stack.Navigator>
        <Stack.Screen name='Account' component={AccountScreen} />
        <Stack.Screen name='My Favourite' component={FavouriteNavigator} options={{headerShown: false}} />
        <Stack.Screen name='Posted Home' component={PostedNavigator} options={{headerShown: false}} />
        <Stack.Screen name='Send Feedback' component={FeedbackScreen} options={{headerShown: false}} />
        <Stack.Screen name='Login' component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name='Register' component={RegisterScreen} options={{headerShown: false}} />
    </Stack.Navigator>
);

export default AccountNavigator;

