// navigation/AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ListScreen from '../screens/ListScreen';
import TaskScreen from '../screens/TaskScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ListScreen">
        <Stack.Screen name="ListScreen" component={ListScreen} options={{ title: 'Lists' }} />
        <Stack.Screen name="TaskScreen" component={TaskScreen} options={{ title: 'Tasks' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
