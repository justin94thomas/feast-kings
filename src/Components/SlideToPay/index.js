import React, { useState } from 'react';
import { View, Text, StyleSheet, Animated, PanResponder, Dimensions, TouchableOpacity } from 'react-native';

const { width } = Dimensions.get('window');

const SlideToPay = ({ finalAmount, handlePayment }) => {
    const [slideAnim] = useState(new Animated.Value(0));
    const [paymentTriggered, setPaymentTriggered] = useState(false);
    const slideLimit = width * 0.6;

    const panResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: Animated.event(
            [null, { dx: slideAnim }],
            { useNativeDriver: false }
        ),
        onPanResponderRelease: (e, gestureState) => {
            if (gestureState.dx > slideLimit) {
                setPaymentTriggered(true);
                handlePayment(finalAmount);
                Animated.spring(slideAnim, {
                    toValue: slideLimit,
                    useNativeDriver: false
                }).start();
            } else {
                Animated.spring(slideAnim, {
                    toValue: 0,
                    useNativeDriver: false
                }).start();
            }
        },
    });


    return (
        <View style={styles.container}>
            <View style={styles.sliderContainer}>
                <Animated.View
                    {...panResponder.panHandlers}
                    style={[styles.slider, { transform: [{ translateX: slideAnim }] }]}
                >
                    <Text style={styles.arrow}>➤</Text>
                </Animated.View>
                <Text style={styles.sliderText}>Slide to Pay | ₹{finalAmount}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    paymentInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        alignItems: 'center',
    },
    cardText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    changeText: {
        color: 'orange',
        fontSize: 14,
        fontWeight: 'bold',
    },
    sliderContainer: {
        backgroundColor: '#4CAF50',
        borderRadius: 40,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        position: 'relative',
    },
    slider: {
        position: 'absolute',
        left: 0,
        backgroundColor: 'white',
        width: 40,
        height: 40,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1,
    },
    arrow: {
        fontSize: 16,
        color: '#4CAF50',
    },
    sliderText: {
        fontSize: 14,
        color: 'white',
        fontWeight: 'bold',
        zIndex: 0,
    },
});

export default SlideToPay;
