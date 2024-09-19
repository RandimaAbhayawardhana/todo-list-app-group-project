// App.js

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import AppNavigator from './navigation/AppNavigator';
import Sidebar from './components/Sidebar';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isSidebarVisible, setIsSidebarVisible] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [profileImage, setProfileImage] = useState(null);

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
                console.error('Failed to load profile:', error);
            }
        };
        loadProfile();
    }, []);

    const handleSearch = (text) => {
        console.log('Search text:', text);
    };

    const toggleTheme = () => {
        setIsDarkMode(prevState => !prevState);
    };

    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    const closeSidebar = () => {
        setIsSidebarVisible(false);
    };

    const updateProfile = (newName, newEmail, newProfileImage) => {
        setName(newName);
        setEmail(newEmail);
        setProfileImage(newProfileImage);
    };

    const deleteProfile = () => {
        // Clear the profile details in the sidebar
        setName('');
        setEmail('');
        setProfileImage(null);

        // Optionally clear AsyncStorage as well (not necessary if already done in ProfileScreen)
        AsyncStorage.removeItem('name');
        AsyncStorage.removeItem('email');
        AsyncStorage.removeItem('profileImage');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            <TouchableOpacity onPress={toggleSidebar} style={styles.iconButton}>
                <Icon name="menu" size={25} color={isDarkMode ? '#fff' : '#000'} />
            </TouchableOpacity>
            {isSidebarVisible && (
                <TouchableOpacity 
                    style={styles.overlay} 
                    onPress={closeSidebar} 
                    activeOpacity={1} 
                />
            )}
            <Sidebar 
                onSearch={handleSearch} 
                onToggleTheme={toggleTheme} 
                isDarkMode={isDarkMode} 
                isVisible={isSidebarVisible} 
                name={name} 
                email={email} 
                profileImage={profileImage} 
            />
            <AppNavigator onProfileChange={updateProfile} onDeleteProfile={deleteProfile} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    iconButton: {
        position: 'absolute',
        top: 45,
        right: 20,
        zIndex: 1000,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 900,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
});
