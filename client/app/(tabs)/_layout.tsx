import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AntDesign } from '@expo/vector-icons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const styles = StyleSheet.create({
    iconContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 15,
      padding: 10,
      height: 60, // Adjust height as needed
      width: 60, // Adjust width as needed
      // borderRadius: 30, // Rounded corners if you want a circular container
      // borderWidth: 1,
      // borderColor: '#949494',
    },
  });

  return (
    <Tabs
      screenOptions={{
        headerShown: false,  // Ensure this hides the header for all screens
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
          },
          default: {
            // borderTopLeftRadius: 35,
            // borderTopRightRadius: 35,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: -3,
            },
            shadowOpacity: 0.1,
            shadowRadius: 3,
            elevation: 3,
            height: 80,
            paddingTop: 20,
            paddingHorizontal: 10,
          },
        }),
      }}
    >

    <Tabs.Screen
        name="store"
        options={{
          title: 'Stores',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <AntDesign name="shoppingcart" size={40} color={color} />
            </View>
          ),
        }}
      />
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <AntDesign name="home" size={40} color={color} />
            </View>
          ),
        }}
      />

    <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <View style={styles.iconContainer}>
              <AntDesign name="user" size={40} color={color} />
            </View>
          ),
        }}
      />
      
    </Tabs>
  );
}
