import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../Pages/SplashScreen';
import HomeScreen from '../Pages/Dashboard';
import LoginScreen from '../Pages/Login/index';
import SignupScreen from '../Pages/Login/Signup';


const Stack = createStackNavigator();

const AppNavigator = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    const userRole = useSelector((state) => state.user.role);

    // useEffect(() => {
    //     const checkUserStatus = async () => {
    //         const storedUserStatus = false;
    //         if (storedUserStatus) {
    //             dispatch({ type: 'LOGIN', payload: 'customer' });
    //         }
    //     };
    //     checkUserStatus();
    // }, [dispatch]);

    return (
        <NavigationContainer>
            {/* <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                {!isLoggedIn ? (
                    <>
                        <Stack.Screen
                            name="Login"
                            component={LoginScreen}
                            options={{ headerShown: false }}
                            initialParams={{ role: userRole || 'customer' }}
                        />
                        <Stack.Screen
                            name="Signup"
                            component={SignupScreen}
                            options={{ headerShown: false }}
                        />
                    </>
                ) : (
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                )}
            </Stack.Navigator> */}

            <Stack.Navigator initialRouteName="Splash">
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
