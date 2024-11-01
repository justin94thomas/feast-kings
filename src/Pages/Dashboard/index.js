import React from 'react';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from './Dashboard';
import Preview from './Preview';
import Checkout from './Checkout';
import TrackOrder from './TrackOrder';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function MainTabs() {
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
}

export default function HomeScreen() {
    const currentScreen = useSelector((state) => state.restaurant.view);

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {currentScreen === 'Menu' ? (
                <Stack.Screen name="Preview" component={Preview} />
            ) : currentScreen === 'Checkout' ? (
                <Stack.Screen name="Checkout" component={Checkout} />
            ) : currentScreen === 'Track' ? (
                <Stack.Screen name="Track" component={TrackOrder} />
            ) : (
                <Stack.Screen name="MainTabs" component={MainTabs} />
            )}
        </Stack.Navigator>
    );
}
