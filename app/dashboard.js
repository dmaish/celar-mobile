import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { getTransactions } from '../services/api';


export default function Dashboard() {
  const router = useRouter();
        const [ transactions, setTransactions ] = useState([]);
  

  useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const res = await getTransactions();
          console.log('Xxxxxx++++++)))API Response:', res?.data?.result); // 👈 log this
          setTransactions(res?.data?.result); 
  
        } catch (err) {
          Toast.show({
              type: 'error',
              text1: 'Signup Failed',
              text2: err.response?.data?.message || err.message || 'Something went wrong',
          });
        } 
      };
  
      fetchTransactions();
    }, []);
  
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      
      <Text>Dashboard</Text>

       <View 
      //  style={styles.container}
       >
        {transactions}
        <FlatList
          data={transactions}
          keyExtractor={(trxn) => trxn?.id}
          renderItem={({ item }) => (
            <View>
              <Text>{item.amount}</Text>
              <Text>{item.currency}</Text>
              <Text>{item.sender?.email}</Text>
              <Text>{item.recipient?.email}</Text>
              <Text>{new Date(item.timestamp).toLocaleString()}</Text>
            </View>
          )}
        />
      </View>

       <Pressable onPress={() => router.replace('/transactions')}>
          <Text style={{ textAlign: 'center', color: 'blue', marginTop: 16 }}>
              Transactions
          </Text>
        </Pressable>

    </View>
  );
}
