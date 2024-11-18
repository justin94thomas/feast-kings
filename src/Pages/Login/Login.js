import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';

const LoginForm = ({ navigation, route }) => {
    const { role } = route.params;
    const dispatch = useDispatch();
    const [emailOrPhone, setEmailOrPhone] = useState('');
    const [otp, setOtp] = useState('');

    const handleLogin = () => {
        if (emailOrPhone && otp) {
            dispatch({ type: 'LOGIN', payload: role });
            navigation.navigate('Home');
        }
    };

    return (
        <View>
            <TextInput placeholder="Email or Mobile" onChangeText={setEmailOrPhone} value={emailOrPhone} />
            <TextInput placeholder="OTP" onChangeText={setOtp} value={otp} />
            <TouchableOpacity onPress={handleLogin}>
                <Text>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

export default LoginForm;
