// src/services/authService.js
import { account } from '../appwrite/config';

export const createUser = async (email, password, name) => {
  try {
    const response = await account.create('unique()', email, password, name);
    return response;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await account.createSession(email, password);
    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await account.deleteSession('current');
  } catch (error) {
    console.error('Error logging out:', error);
    throw error;
  }
};
