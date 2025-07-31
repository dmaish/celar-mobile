import React, { useState } from 'react';
import Toast from 'react-native-toast-message';

import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Picker } from '@react-native-picker/picker';
import { signupUser } from '../services/api';


export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const router = useRouter();

  const handleSignup = async() => {
    try {
      const payload = { email, password, role };
      const response =  await signupUser(payload);

      if (response.status === 201) {
        Toast.show({
            type: 'success',
            text1: 'Signup Successful',
            text2: 'Welcome aboard ',
        });

      }

    } catch (err) {
      const errorsArray = err.response?.data?.errors;

      if (errorsArray && Array.isArray(errorsArray)) {
        const errorMessages = errorsArray.map(e => `• ${e.message}`).join('\n');
            Toast.show({
              type: 'error',
              text1: 'Signup Failed',
              text2: errorMessages,
            });
        
      } 
      else {
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: err.response?.data?.message || err.message || 'Something went wrong',
        });

      }
         
    }
  };


  return (
     <View style={styles.container}>
        <Text style={styles.title}>Create Account 📝</Text>

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

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={role}
            onValueChange={(itemValue) => setRole(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="DEV" value="DEV" />
            <Picker.Item label="PSP" value="PSP" />
          </Picker>
        </View>

        <TouchableOpacity 
          onPress={handleSignup} 
          style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.replace('/login')}>
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
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    marginBottom: 20,
    overflow: 'hidden',
    backgroundColor: '#fafafa',
  },
  picker: {
    height: 50,
    width: '100%',
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
