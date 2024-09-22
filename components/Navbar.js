import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch, Alert } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useTheme } from '../App';

const NavbarContent = (props) => {
  const { theme, toggleTheme } = useTheme();
  const [isDarkMode, setIsDarkMode] = useState(theme.dark);

  const handleToggleTheme = () => {
    setIsDarkMode((prev) => !prev);
    toggleTheme();
  };

  const handleLogout = () => {
    Alert.alert("Logout", "Are you sure you want to log out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Logout", onPress: () => { 
          props.navigation.navigate('Login');
        }
      }
    ]);
  };

  return (
    <DrawerContentScrollView {...props} style={[styles.drawerContainer, { backgroundColor: theme.colors.background }]}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.arrowButton}
          onPress={() => props.navigation.navigate('Home')}
        >
          <MaterialIcons name="chevron-left" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Main Menu</Text>
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('StarredTasks')}>
        <Ionicons name="star-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Favorites</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>App Settings</Text>
      </TouchableOpacity>

      <View style={styles.menuItem}>
        <Ionicons name="moon-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Dark Mode</Text>
        <Switch
          value={isDarkMode}
          onValueChange={handleToggleTheme}
          trackColor={{ false: '#767577', true: '#81b0ff' }}
          thumbColor={isDarkMode ? '#f5dd4b' : '#f4f3f4'}
        />
      </View>

      <TouchableOpacity style={styles.menuItem} onPress={() => props.navigation.navigate('Help & Support')}>
        <Ionicons name="help-circle-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Help & Support</Text>
      </TouchableOpacity>

      {/* Logout option */}
      <TouchableOpacity style={styles.menuItem} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#FFD700" style={styles.icon} />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Logout</Text>
      </TouchableOpacity>
      
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#1E1E1E',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
    color: '#FFD700',
  },
  arrowButton: {
    paddingLeft: 0,
    paddingRight: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#E2DFD2',
    borderRadius: 8,
    marginVertical: 5,
  },
  menuText: {
    paddingLeft: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default NavbarContent;
