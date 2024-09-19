// components/Sidebar.js

import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Switch, TouchableOpacity, Text, Animated, Image } from 'react-native';

const Sidebar = ({ onSearch, onToggleTheme, isDarkMode, isVisible, name, email, profileImage }) => {
    const slideAnim = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : -250,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    return (
        <Animated.View 
            style={[styles.container, { transform: [{ translateX: slideAnim }] }, isDarkMode ? styles.darkContainer : styles.lightContainer]}
        >
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: profileImage || 'https://example.com/default-profile-pic.jpg' }} // Replace with actual image URL or state
                    style={styles.profileImage}
                />
                <View>
                    <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#000' }]}>{name || 'User Name'}</Text>
                    <Text style={{ color: isDarkMode ? '#ccc' : '#555' }}>{email || 'user@example.com'}</Text>
                </View>
            </View>

            <TextInput
                style={styles.searchInput}
                placeholder="Search..."
                onChangeText={onSearch}
                placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            />
            <View style={styles.themeToggle}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={onToggleTheme}
                />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: 250,
        position: 'absolute',
        left: 0,
        top: 0,
        height: '100%',
        zIndex: 1000,
    },
    lightContainer: {
        backgroundColor: '#f8f8f8',
    },
    darkContainer: {
        backgroundColor: '#333',
    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 20,
        marginTop: 20,
    },
    themeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
});

export default Sidebar;
