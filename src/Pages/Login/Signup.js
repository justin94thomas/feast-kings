import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';

const SignupScreen = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [otp, setOtp] = useState('');
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const route = useRoute();
    const { role } = route.params; // 'customer' or 'agent'

    const handleSignup = () => {
        if (firstName && lastName && mobileNumber && otp) {
            dispatch({ type: 'LOGIN', payload: role });
            navigation.navigate('Home');
        }
    };

    const handleGenerateOtp = () => {
        // Placeholder for generating OTP logic
        console.log('OTP generated for:', mobileNumber);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`Signup as ${role === 'customer' ? 'Customer' : 'Agent'}`}</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={firstName}
                onChangeText={setFirstName}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={lastName}
                onChangeText={setLastName}
            />
            <TextInput
                style={styles.input}
                placeholder="Mobile Number"
                value={mobileNumber}
                onChangeText={setMobileNumber}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="OTP"
                value={otp}
                onChangeText={setOtp}
                secureTextEntry
            />
            <TouchableOpacity onPress={handleGenerateOtp}>
                <Text style={styles.linkText}>Generate OTP</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleSignup}>
                <Text style={styles.buttonText}>Signup</Text>
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
        backgroundColor: '#28a745',
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
        marginTop: 10,
        textAlign: 'center',
        color: '#007bff',
    },
});

export default SignupScreen;
