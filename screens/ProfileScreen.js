// screens/ProfileScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
      } catch (error) {
        Alert.alert('Error', 'Failed to load profile information.');
      }
    };
    loadProfile();
  }, []);

  const saveProfile = async () => {
    try {
      await AsyncStorage.setItem('name', name);
      await AsyncStorage.setItem('email', email);
      Alert.alert('Profile Updated', 'Your profile information has been saved.');
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile information.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Enter your name" />
      
      <Text style={styles.label}>Email</Text>
      <TextInput style={styles.input} value={email} onChangeText={setEmail} placeholder="Enter your email" keyboardType="email-address" />
      
      <Button title="Save Profile" onPress={saveProfile} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
});
