import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import ListingsNavigator from './ListingsNavigator';
import AddListingNavigator from './AddListingNavigator';
import AccountNavigator from './AccountNavigator';

const Tab = createBottomTabNavigator();

const AppNavigator = () => (
    <Tab.Navigator>
        <Tab.Screen 
            name='Home' 
            component={ListingsNavigator} 
            options={{
                tabBarIcon: ({ color }) => 
                <MaterialCommunityIcons name='home' color={color} size={30} />
            }}
        />
        <Tab.Screen 
            name='Offers' 
            component={AddListingNavigator} 
            options={{
                tabBarIcon: ({ color }) => 
                <MaterialCommunityIcons name='pen-plus' color={color} size={30} />
            }}
        />
        <Tab.Screen 
            name='Account' 
            component={AccountNavigator} 
            options={{
                tabBarIcon: ({ color }) => 
                <MaterialCommunityIcons name='account' color={color} size={30} />
            }}
        />
    </Tab.Navigator>
);

export default AppNavigator;

