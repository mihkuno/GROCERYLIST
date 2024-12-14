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


  const removeGroceryListItem = async (item_ids) => {
    if (!session) {
        alert('No session found!');
        return;
    }

    try {
        const response = await axios.delete('http://192.168.164.137:3000/items/delete', {
            data: {
                user_id: session.id,
                email: session.email,
                password: session.password,
                item_ids: item_ids
            }
        });

        return response.data;
    } catch (error) {
        if (error.response) {
            alert(JSON.stringify(error.response.data.error));
        } else {
            alert(JSON.stringify(error));
        }
    }
}       

  const addGroceryListItems = async (listId, items) => {

    // {
    //     "user_id": 1,
    //     "email": "user@example.com",
    //     "password": "helloworldx",
    //     "list_id": 1,
    //     "items": [
    //       {
    //         "name": "Milk",
    //         "quantity": 2,
    //         "price": 3.50,
    //         "is_checked": false
    //       },
    //       {
    //         "name": "Bread",
    //         "quantity": 1,
    //         "price": 2.00,
    //         "is_checked": true
    //       }
    //     ]
    //   }

    if (!session) {
      alert('No session found!');
      return;
    }

    try {
        const response = await axios.post('http://192.168.164.137:3000/items/add', {
            user_id: session.id,
            email: session.email,
            password: session.password,
            list_id: listId,
            items: items
        });

        return response.data;

    }

    catch (error) {
        if (error.response) {
            alert(JSON.stringify(error.response.data.error));
        } else {
            alert(JSON.stringify(error));
        }
    }
    }

  const updateGroceryListDetails = async (data) => {

    // {
    //     "id": 1,  // User ID
    //     "email": "user@example.com",
    //     "password": "password123",
    //     "details": {
    //       "id": 3  // List ID
    //     },
    //     "headerTitle": "Updated Weekly Groceries",
    //     "items": [
    //       { "id": 1, "name": "Milk", "quantity": 3, "price": 6.50, "isChecked": true },
    //       { "id": 2, "name": "Eggs", "quantity": 2, "price": 2.50, "isChecked": false },
    //       { "name": "Bread", "quantity": 1, "price": 2.00, "isChecked": true }
    //     ]
    //   }
      
      
    if (!session) {
      alert('No session found!');
      return;
    }

    try {
        data.id = session.id;
        data.email = session.email;
        data.password = session.password;

        const response = await axios.put('http://192.168.164.137:3000/lists/update', data);
        return response.data;
    }
    catch (error) {
      if (error.response) {
        alert(JSON.stringify(error.response.data.error));
      } else {
        alert(JSON.stringify(error));
      }
    }
    }


  const getGroceryListDetails = async (listId) => {
    if (!session) {
      alert('No session found!');
      return;
    }

    try {
        const response = await axios.post('http://192.168.164.137:3000/lists/detail', {
            id: session.id,
            email: session.email,
            password: session.password,
            listId: listId
        });
        return response.data;
    }
    catch (error) {
      if (error.response) {
        alert(JSON.stringify(error.response.data.error));
      } else {
        alert(JSON.stringify(error));
        }
    }
    }

  const getGroceryLists = async () => {

    if (!session) {
      alert('No session found!');
      return;
    }

    try {
      const response = await axios.post('http://192.168.164.137:3000/lists', {
        id: session.id,
        name: session.name,
        email: session.email,
        password: session.password
      });

        return response.data;
    }
    catch (error) {
      if (error.response) {
        alert(JSON.stringify(error.response.data.error));
      } else {
        alert(JSON.stringify(error));
      }
    }
    }

    const deleteGroceryList = async (listId) => {   
        if (!session) {
            alert('No session found!');
            return;
          }

        try {
              // Send data in the body of the DELETE request
            const response = await axios.delete('http://192.168.164.137:3000/lists/delete', {
                data: {
                user_id: session.id,
                email: session.email,
                password: session.password,
                list_id: listId,
                },
            });

            return response.data;

        }
        catch (error) {
            if (error.response) {
                alert(JSON.stringify(error.response.data.error));
            } else {
                alert(JSON.stringify(error));
            }
        }
    }

    const createGroceryList = async (listName, items) => {

        // {
        //     "id": 1,
        //     "email": "user@example.com",
        //     "password": "securepassword",
        //     "name": "Weekly Groceries",
        //     "items": [
        //       { "name": "Apples", "quantity": 5, "price": 3.5 },
        //       { "name": "Milk", "quantity": 2, "price": 2.0 }
        //     ]
        //   }

        if (!session) {
            alert('No session found!');
            return;
          }

        try {
            const response = await axios.post('http://192.168.164.137:3000/lists/create', {
                user_id: session.id,
                email: session.email,
                password: session.password,
                list_name: listName,
                items: items
            });
    
            return response.data;
        }
        catch (error) {
            if (error.response) {
                alert(JSON.stringify(error.response.data.error));
            } else {
                alert(JSON.stringify(error));
            }
        }
    };


  const createAccount = async (name, email, password, confirmPassword) => {
    try {
        const response = await axios.post('http://192.168.164.137:3000/users/create', {
          name: name,
          email: email,
          password: password,
          confirmPassword: confirmPassword, // Ensure this matches the password
        });
    
        console.log('User created:', response.data);
        saveSession({email, password});
      } 
      
      catch (error) {
        if (error.response) {
          alert(JSON.stringify(error.response.data.error));
        } else {
          alert(JSON.stringify(error));
        }
    }
}

  const validateSession = async (session) => {
    // check if it has the required fields
    if (!('email' in session && 'password' in session)) {
      return false;
    }

    try {
        const response = await axios.post('http://192.168.164.137:3000/users/login', {
          email: session.email,
          password: session.password,
        });

        return response.data;
      } 
      
      catch (error) {
        if (error.response) {
            alert(JSON.stringify(error.response.data.error));
          } else {
            alert(JSON.stringify(error));
          }
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
    <SessionContext.Provider value={{ session, saveSession, clearSession, createAccount, getGroceryLists, createGroceryList, getGroceryListDetails, updateGroceryListDetails, addGroceryListItems, removeGroceryListItem, deleteGroceryList  }}>
      {children}
    </SessionContext.Provider>
  );
};
