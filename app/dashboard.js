import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTransactions } from '../services/api';
import { USER_ROLE } from '../utils/constants';


export default function Dashboard() {
  const router = useRouter();
        const [ transactions, setTransactions ] = useState([]);
  

  useEffect(() => {
      const fetchTransactions = async () => {
        try {
          const userDetails = await AsyncStorage.getItem('userDetails');
          Toast.show({
              type: 'success',
              text1: `${userDetails?.role} Analytics`,
              text2: userDetails?.role === USER_ROLE.PSP ? "You have 20 merchants connected"  : "You've made 35 API calls this week" ,
          });


          const res = await getTransactions();
          setTransactions(res?.data?.result); 

  
        } catch (err) {
          Toast.show({
              type: 'error',
              text1: 'Transaction Fetching Failed',
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
       >
        <FlatList
          data={transactions}
          keyExtractor={(trxn) => trxn?.id}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text>{item.currency}</Text>
              <Text style={styles.email}>{item.sender?.email}</Text>
              <Text style={styles.email}>{item.recipient?.email}</Text>
              <Text style={styles.timestamp}>{new Date(item.timestamp).toLocaleString()}</Text>
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

const styles = StyleSheet.create({
  listContainer: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#2a9d8f',
  },
  email: {
    fontSize: 14,
    color: '#264653',
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 6,
  },
});
