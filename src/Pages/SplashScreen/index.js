import React, { useEffect } from 'react';
import { View, StyleSheet, Dimensions, Image } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const { height, width } = Dimensions.get('window');

    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace('Home');
        }, 3000);

        return () => clearTimeout(timer);
    }, [navigation]);

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

            {/* Logo in the center with zIndex */}
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
