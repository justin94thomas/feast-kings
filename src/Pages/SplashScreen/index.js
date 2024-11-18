import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const SplashScreen = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');

    // Get authentication status from Redux store
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
            // For when you fix login screen issues - Remove the line above(navigation.replace('Home');).

            // if (navigation && navigation.navigate) {
            //     if (isLoggedIn) {
            //         navigation.replace('Home'); // Navigate to Home if logged in
            //     } else {
            //         navigation.replace('Login'); // Navigate to Login if not logged in
            //     }
            // }
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation, isLoggedIn]);

    return (
        <View style={styles.container}>
            {/* Animated background image */}
            <Animatable.Image
                animation="bounceIn"
                duration={1500}
                source={require('../../Assets/Images/cover.jpeg')}
                style={[styles.backgroundImage, { height, width }]}
                resizeMode="cover"
            />
            {/* Logo in the center */}
            <Image
                source={require('../../../assets/splash-logo.png')}
                style={styles.image1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
    },
    image1: {
        width: 250,
        height: 250,
        position: 'absolute',
        zIndex: 2,
        shadowColor: '#ffffff',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 15,
        elevation: 10,
    },
});

export default SplashScreen;
