import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen({ onProfileChange, onDeleteProfile }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const storedName = await AsyncStorage.getItem('name');
        const storedEmail = await AsyncStorage.getItem('email');
        const storedImage = await AsyncStorage.getItem('profileImage');
        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedImage) setProfileImage(storedImage);
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
      await AsyncStorage.setItem('profileImage', profileImage); // Save image URL
      Alert.alert('Profile Updated', 'Your profile information has been saved.');
      onProfileChange(name, email, profileImage); // Notify the parent component
    } catch (error) {
      Alert.alert('Error', 'Failed to save profile information.');
    }
  };

  const changeProfilePhoto = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const imageUri = response.assets[0].uri;
        setProfileImage(imageUri); // Update profile image state
      }
    });
  };

  const deleteProfile = async () => {
    try {
      await AsyncStorage.removeItem('name');
      await AsyncStorage.removeItem('email');
      await AsyncStorage.removeItem('profileImage');
      setName('');
      setEmail('');
      setProfileImage('');
      Alert.alert('Profile Deleted', 'Your profile information has been removed.');
      onDeleteProfile(); // Notify the parent component to clear profile
    } catch (error) {
      Alert.alert('Error', 'Failed to delete profile information.');
    }
  };

  return (
    <View style={styles.container}>
 

      {/* Profile Photo Section */}
      <Text style={styles.label}>Profile Photo</Text>
      <Image source={{ uri: profileImage || 'https://example.com/default-profile-pic.jpg' }} style={styles.profileImage} />
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'blue', marginTop: 10 }]} onPress={changeProfilePhoto}>
        <Text style={styles.buttonText}>Change Profile Photo</Text>
      </TouchableOpacity>

      {/* Name Input */}
      <Text style={styles.label}>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        placeholder="Enter your name" 
      />
      
      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput 
        style={styles.input} 
        value={email} 
        onChangeText={setEmail} 
        placeholder="Enter your email" 
        keyboardType="email-address" 
      />

      {/* Save and Delete Profile Buttons */}
      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'blue', marginTop: 10 }]}onPress={saveProfile}>
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'red', marginTop: 10 }]} onPress={deleteProfile}>
        <Text style={styles.buttonText}>Delete Profile</Text>
      </TouchableOpacity>
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
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    alignSelf: 'center', // Centers the profile image
  },
  buttonContainer: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8, // Curves the button corners
    marginBottom: 20, // Adds space between buttons and inputs
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});