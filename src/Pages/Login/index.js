import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';

const LoginScreen = () => {
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { role } = route.params;

    const handleLogin = () => {
        if (emailOrPhone && otp) {
            dispatch({ type: 'LOGIN', payload: role });
            navigation.navigate('Home');
        }
    };

    const handleSignupNavigation = () => {
        navigation.navigate('Signup', { role });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Login as ${role === 'customer' ? 'Customer' : 'Agent'}`}</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter registered email or mobile number"
                value={emailOrPhone}
                onChangeText={setEmailOrPhone}
            />
            <TextInput
                style={styles.input}
                placeholder="Enter OTP"
                value={otp}
                onChangeText={setOtp}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSignupNavigation}>
                <Text style={styles.linkText}>
                    {role === 'customer' ? 'Not a customer yet?' : 'Not an agent yet?'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginVertical: 10,
        borderRadius: 8,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    linkText: {
        marginTop: 20,
        textAlign: 'center',
        color: '#007bff',
    },
});

export default LoginScreen;
