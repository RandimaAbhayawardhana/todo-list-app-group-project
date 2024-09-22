import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import React, { useState, createContext, useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useColorScheme, StyleSheet, View, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import TodoList from './components/TodoList'; 
import CustomDrawerContent from './components/Navbar';
import ListScreen from './screens/ListScreen';
import SettingScreen from './screens/SettingScreen';
import GettingStartedScreen from './screens/GettingStartedScreen';
import HelpAndSupportScreen from './screens/HelpAndSupportScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import StarredTasks from './screens/StarredTasks';
import { MaterialIcons } from '@expo/vector-icons';

// Theme Context to share theme information
const Theme = createContext();
export const useTheme = () => useContext(Theme);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function DrawerNavigator({ user,starredTasks }) {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: true,
        headerTitle: "Home",
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTintColor: theme.colors.text,
        drawerStyle: { 
          width: 240,
          backgroundColor: theme.colors.background,
        },
        drawerInactiveTintColor: theme.colors.text,
        drawerActiveTintColor: '#fff',
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 15 }}>
            <Text style={{ color: theme.colors.text, marginRight: 10 }}>{user?.username}</Text>
            <MaterialIcons name="account-circle" size={30} color={theme.colors.text} />
          </View>
        ),
      }}
    >
      <Drawer.Screen name="Home">
        {(props) => <TodoList {...props} theme={theme} />}
      </Drawer.Screen>
       {/* Instead of children, use component */}
       <Drawer.Screen
        name="StarredTasks"
        component={StarredTasks}
        initialParams={{ starredTasks: [] }} // Pass empty array as default if no starred tasks
       />
      <Drawer.Screen name="Settings" component={SettingScreen} />
      <Drawer.Screen name="Help & Support" component={HelpAndSupportScreen} />
    </Drawer.Navigator>
  );
}

function AppNavigator({ user }) {
  return (
    <Stack.Navigator initialRouteName="Start">
      <Stack.Screen 
        name="Start" 
        component={GettingStartedScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }} 
      >
        {(props) => <LoginScreen {...props} setUser={user.setUser} />}
      </Stack.Screen>
      <Stack.Screen 
        name="SignUp" 
        component={SignUpScreen} // Add SignUpScreen to the navigator
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Main" 
        options={{ headerShown: false }}
      >
        {(props) => <DrawerNavigator {...props} user={user} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

export default function App() {
  const systemScheme = useColorScheme();
  const [theme, setTheme] = useState(systemScheme === 'dark' ? DarkTheme : DefaultTheme);
  const [user, setUser] = useState(null);  // Store user info after login

  const toggleTheme = () => {
    setTheme((currentTheme) =>
      currentTheme.dark ? DefaultTheme : DarkTheme
    );
  };

  return (
    <Theme.Provider value={{ theme, toggleTheme }}>
      <NavigationContainer theme={theme}>
        <AppNavigator user={{ username: user?.username, setUser }} />
      </NavigationContainer>
    </Theme.Provider>
  );
}
