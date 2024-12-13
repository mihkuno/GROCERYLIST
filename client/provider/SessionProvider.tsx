import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import axios from 'axios';
import * as SystemUI from 'expo-system-ui';


// Create the context
export const SessionContext = createContext();

// Provider component
export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);

  // Load session from storage
  useEffect(() => {
    const loadSession = async () => {
      const storedSession = await AsyncStorage.getItem('session');
      if (storedSession) {
        setSession(JSON.parse(storedSession));
      }
    };
    loadSession();
  }, []);

  const validateSession = async (session) => {
    // check if it has the required fields
    if (!('email' in session && 'password' in session)) {
      return false;
    }

    try {
        const response = await axios.post('http://192.168.1.5:3000/users/login', {
          email: session.email,
          password: session.password,
        });

        return response.data;
      } 
      
      catch (error) {
        alert(`Login failed ${JSON.stringify(error.response?.data.error || error.message)}` );
        return false;
      }

  }     

  // Save session to storage
  const saveSession = async (newSession, allowRedirect=true) => {
    const data = await validateSession(newSession);

    if (!data) return false;

    newSession.id = data.id;
    newSession.name = data.name;
    // await AsyncStorage.setItem('session', JSON.stringify(newSession));
    setSession(newSession);

    if (allowRedirect) {
        SystemUI.setBackgroundColorAsync("#FBF9F1");
        router.replace('/(tabs)/');
    } 
  };

  // Clear session from storage
  const clearSession = async (allowRedirect=true) => {
    await AsyncStorage.removeItem('session');
    setSession(null);

    if (allowRedirect) {   
        SystemUI.setBackgroundColorAsync("#92C7CF");
        router.replace('/auth/signIn');
    }
  };

  return (
    <SessionContext.Provider value={{ session, saveSession, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
};
