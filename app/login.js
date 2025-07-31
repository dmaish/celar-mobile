import React, { useState } from 'react';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import { Redirect } from 'expo-router';


export default function LoginScreen() {
    const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // const handleRedirect = () => {
  //     return <Redirect href="/dashboard" />;
  // }

  const handleLogin = async() => {
    try {
      const payload = { email, password };
      const response =  await loginUser(payload);

      if (response.data.status === 200) {
        Toast.show({
            type: 'success',
            text1: 'Login Successful',
            text2: 'Welcome again',
        });

        const token = response.data.result.token;

        AsyncStorage.setItem('authToken', token);
        router.push('/dashboard'); // Navigate to dashboard after successful login
        
      }
      
      // TODO: Save token, navigate to dashboard, etc.
    } catch (err) {

      const errorsArray = err.response?.data?.errors;
        
      if (errorsArray && Array.isArray(errorsArray)) {
          const errorMessages = errorsArray.map(e => `• ${e.message}`).join('\n');
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: errorMessages,
          });
          
      } else {
          Toast.show({
            type: 'error',
            text1: 'Login Failed',
            text2: err.response?.data?.message || err.message || 'Something went wrong',
          });
      }
  }
  };


  return (
      <View style={styles.container}>
      <Text style={styles.title}>Welcome Back 👋</Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Pressable onPress={() => router.replace('/signup')}>
        <Text style={{ textAlign: 'center', color: 'blue', marginTop: 16 }}>
          Already have an account? Login
        </Text>
      </Pressable>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 40,
    color: '#333',
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  button: {
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
});
