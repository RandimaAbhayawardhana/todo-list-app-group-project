import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Existing Screens
import ListScreen from '../screens/ListScreen';
import TaskScreen from '../screens/TaskScreen';

// New Screens
import ProfileScreen from '../screens/ProfileScreen';
import NotificationsScreen from '../screens/NotificationsScreen';

// Stack Navigator for Task Management (ListScreen and TaskScreen)
const TaskStack = createStackNavigator();
function TaskStackNavigator() {
  return (
    <TaskStack.Navigator initialRouteName="ListScreen">
      <TaskStack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Task Lists' }} />
      <TaskStack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Tasks' }} />
    </TaskStack.Navigator>
  );
}

// Stack Navigator for Profile
const ProfileStack = createStackNavigator();
function ProfileStackNavigator({ onProfileChange }) {
  return (
    <ProfileStack.Navigator initialRouteName="Profile">
      <ProfileStack.Screen name="Profile">
        {() => <ProfileScreen onProfileChange={onProfileChange} />}
      </ProfileStack.Screen>
      {/* Add other profile-related screens here if needed */}
    </ProfileStack.Navigator>
  );
}

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();
export default function AppNavigator({ onProfileChange }) {
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
          tabBarActiveTintColor: '#4CAF50',
          tabBarInactiveTintColor: '#777',
          tabBarStyle: { paddingBottom: 5, height: 60 },
        })}
      >
        <Tab.Screen name="Tasks" component={TaskStackNavigator} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
        <Tab.Screen name="Profile">
          {() => <ProfileStackNavigator onProfileChange={onProfileChange} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
