import api from './axios';

export const signupUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    return response;

  } catch (error) {
    throw error; 
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post('/login', userData);
    return response;

  } catch (error) {
    throw error; 
  }
};

export const sendMoney = async (transactionData) => {
  try {
    const response = await api.post('/send', transactionData);
    return response;

  } catch (error) {
    throw error; 
  }
};

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    return response;

  } catch (error) {
    throw error; 
  }
};

export const getTransactions = async () => {
  try {
    const response = await api.get('/transactions');
    return response;

  } catch (error) {
    throw error; 
  }
};
