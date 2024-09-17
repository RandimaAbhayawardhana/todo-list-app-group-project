// navigation/AppNavigator.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from '../screens/ListScreen';  // Adjust the path if needed
import TaskScreen from '../screens/TaskScreen';  // Adjust the path if needed

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListScreen">
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Task Lists' }} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Tasks' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
