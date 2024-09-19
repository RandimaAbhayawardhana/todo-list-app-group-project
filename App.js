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
    

    // Load profile from AsyncStorage
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

    // Handle sidebar search input
    const handleSearch = (text) => {
        console.log('Search text:', text);
    };

    // Toggle dark/light mode
    const toggleTheme = () => {
        setIsDarkMode(prevState => !prevState);
    };

    // Toggle sidebar visibility
    const toggleSidebar = () => {
        setIsSidebarVisible(prev => !prev);
    };

    // Close sidebar on overlay tap or menu selection
    const closeSidebar = () => {
        setIsSidebarVisible(false);
    };

    // Handle profile updates (can be passed to other components)
    const updateProfile = (newName, newEmail, newProfileImage) => {
        setName(newName);
        setEmail(newEmail);
        setProfileImage(newProfileImage);
    };

    const handleMenuSelect = (menuItem) => {
        console.log('Selected menu:', menuItem);

        switch (menuItem) {
            case 'Profile':
                navigation.navigate('Profile'); // Navigate to the Profile screen
                break;
            case 'MyTasks':
                navigation.navigate('MyTasks'); // Navigate to My Tasks screen
                break;
            case 'Logout':
                deleteProfile();
                break;
            default:
                break;
        }
        closeSidebar(); // Close the sidebar after selecting a menu item
    };

    // Clear profile and optionally AsyncStorage
    const deleteProfile = async () => {
        setName('');
        setEmail('');
        setProfileImage(null);

        // Optionally clear AsyncStorage profile data
        await AsyncStorage.removeItem('name');
        await AsyncStorage.removeItem('email');
        await AsyncStorage.removeItem('profileImage');
        console.log('Profile deleted');
    };

    return (
        <View style={[styles.container, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
            {/* Button to open sidebar */}
            <TouchableOpacity onPress={toggleSidebar} style={styles.iconButton}>
                <Icon name="menu" size={25} color={isDarkMode ? '#fff' : '#000'} />
            </TouchableOpacity>

            {/* Overlay to close the sidebar */}
            {isSidebarVisible && (
                <TouchableOpacity 
                    style={styles.overlay} 
                    onPress={closeSidebar} 
                    activeOpacity={1} 
                />
            )}

            {/* Sidebar Component */}
            <Sidebar 
                onSearch={handleSearch}
                onToggleTheme={toggleTheme}
                isDarkMode={isDarkMode}
                isVisible={isSidebarVisible}
                name={name}
                email={email}
                profileImage={profileImage}
                onMenuSelect={handleMenuSelect} // Pass handleMenuSelect for menu actions
            />

            {/* Main content */}
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
