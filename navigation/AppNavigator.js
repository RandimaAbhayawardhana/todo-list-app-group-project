// navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Existing Screens
import ListScreen from '../screens/ListScreen';  // Adjust the path if needed
import TaskScreen from '../screens/TaskScreen';  // Adjust the path if needed

// New Screens
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Nested Stack for Task Management (ListScreen and TaskScreen)
function TaskStack() {
  return (
    <Stack.Navigator initialRouteName="ListScreen">
      <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Task Lists' }} />
      <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Tasks' }} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Tasks') {
              iconName = 'list';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'Notifications') {
              iconName = 'notifications';
            }
            return <Icon name={iconName} size={size} color={color} />;
          },
          // Move the tabBarOptions settings here
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#777',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        })}
      >
        {/* Task-related screens (ListScreen and TaskScreen) */}
        <Tab.Screen name="Tasks" component={TaskStack} />

        {/* Notifications screen for scheduled tasks */}
        <Tab.Screen name="Notifications" component={NotificationsScreen} />

        {/* Profile screen for user management */}
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
