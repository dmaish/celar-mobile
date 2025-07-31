import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useRouter } from 'expo-router';
import { getUsers, sendMoney } from '../services/api';



export default function Transactions() {
    const router = useRouter();
  
      const [ recipients, setRecipients ] = useState([]);
      const [ recipientId, setRecipientId ] = useState('');
      const [ amount, setAmount ] = useState('');
      const [ currency, setCurrency ] = useState('');



    // get recipients
    useEffect(() => {
      const fetchRecipients = async () => {
        try {
          const res = await getUsers();
          console.log('Xxxxxx++++++)))API Response:', res?.data?.result); // 👈 log this
          setRecipients(res?.data?.result); 

        } catch (err) {
          Toast.show({
              type: 'error',
              text1: 'Signup Failed',
              text2: err.response?.data?.message || err.message || 'Something went wrong',
          });
        } 
      };

      fetchRecipients();
    }, []);
    
   const handleSend = async() => {
      try {
        const payload = { amount, recipientId, currency };
        const response =  await sendMoney(payload);
  
        if (response.status === 201) {
          Toast.show({
              type: 'success',
              text1: 'Transaction Successful',
              text2: 'Welcome aboard ',
          });
  
        }
  
      } catch (err) {
        const errorsArray = err.response?.data?.errors;
                
              if (errorsArray && Array.isArray(errorsArray)) {
                  const errorMessages = errorsArray.map(e => `• ${e.message}`).join('\n');
                  Toast.show({
                    type: 'error',
                    text1: 'Transaction Failed',
                    text2: errorMessages,
                  });
                  
              } else {
                  Toast.show({
                    type: 'error',
                    text1: 'Transaction Failed',
                    text2: err.response?.data?.message || err.message || 'Something went wrong',
                  });
              }




        // console.error('+++++++++++++++++++++++Error sending money:>>>>>', err);
        //   Toast.show({
        //     type: 'error',
        //     text1: 'Transaction Failed',
        //     text2: err.response?.data?.message || err.message || 'Something went wrong',
        //   });
           
      }
    };


   return (
     <View style={styles.container}>
        <Text style={styles.title}>Send Money 💰</Text>

        <TextInput
          placeholder="Amount"
          type="number"
          value={amount}
          onChangeText={setAmount}
          style={styles.input}
        />

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={currency}
            onValueChange={(itemValue) => setCurrency(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="KES" value="KES" />
            <Picker.Item label="USD" value="USD" />
          </Picker>
        </View>



        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={recipientId}
            onValueChange={(itemValue) => setRecipientId(itemValue)}
            style={styles.picker}
          >
            {
                recipients?.map((user) => (
                    <Picker.Item key={user.id} label={user.email} value={user.id} />
                ))
            }
          </Picker>
        </View>

        <TouchableOpacity 
          onPress={handleSend} 
          style={styles.button}>
          <Text style={styles.buttonText}>Send Money</Text>
        </TouchableOpacity>

        <Pressable onPress={() => router.replace('/dashboard')}>
          <Text style={{ textAlign: 'center', color: 'blue', marginTop: 16 }}>
              Dashboard
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
