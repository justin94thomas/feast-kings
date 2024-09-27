import React from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from './Dashboard';
import Preview from './Preview';
import Checkout from './Checkout';


const Tab = createBottomTabNavigator();

export default function HomeScreen() {
    const state = useSelector(state => state)
    const currentScreen = state.restaurant.view;

    if (currentScreen === 'Dashboard') {
        return (
            <Tab.Navigator>
                <Tab.Screen
                    name="Delivery"
                    component={Dashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="restaurant" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Dining"
                    component={Dashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="dinner-dining" color={color} size={size} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Reorder"
                    component={Dashboard}
                    options={{
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialIcons name="restore" color={color} size={size} />
                        ),
                    }}
                />
            </Tab.Navigator>
        );
    } else if (currentScreen === 'Menu') {
        return (
            <Preview />
        )
    } else if (currentScreen === 'Checkout') {
        return (
            <Checkout />
        )
    } else {
        return null
    }
}