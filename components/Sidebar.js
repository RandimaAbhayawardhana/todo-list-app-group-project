import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, Switch, TouchableOpacity, Text, Animated, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons

const Sidebar = ({ onSearch, onToggleTheme, isDarkMode, isVisible, name, email, profileImage, onMenuSelect }) => {
    const slideAnim = useRef(new Animated.Value(-250)).current;

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: isVisible ? 0 : -250,
            duration: 300,
            useNativeDriver: true,
        }).start();
    }, [isVisible]);

    const menuItems = [
        { title: 'Profile', icon: 'person', action: () => onMenuSelect('Profile') },
        { title: 'My Tasks', icon: 'checkmark-circle', action: () => onMenuSelect('MyTasks') },
        { title: 'Text Size', icon: 'options', action: () => onMenuSelect('TextSize') },
        { title: 'Logout', icon: 'log-out', action: () => onMenuSelect('Logout') },
    ];

    return (
        <Animated.View 
            style={[styles.container, { transform: [{ translateX: slideAnim }] }, isDarkMode ? styles.darkContainer : styles.lightContainer]}
        >
            {/* Profile Info */}
            <View style={styles.profileContainer}>
                <Image 
                    source={{ uri: profileImage || 'https://example.com/default-profile-pic.jpg' }}
                    style={styles.profileImage}
                />
                <View>
                    <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#000' }]}>{name || 'User Name'}</Text>
                    <Text style={{ color: isDarkMode ? '#ccc' : '#555' }}>{email || 'user@example.com'}</Text>
                </View>
            </View>

            {/* Search Input */}
            <TextInput
                style={[styles.searchInput, { borderColor: isDarkMode ? '#555' : '#ccc' }]}
                placeholder="Search..."
                onChangeText={onSearch}
                placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            />

            {/* Theme Toggle */}
            <View style={styles.themeToggle}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>
                    {isDarkMode ? "Light Mode" : "Dark Mode"}
                </Text>
                <Switch
                    value={isDarkMode}
                    onValueChange={onToggleTheme}
                />
            </View>

            {/* Menu Items */}
            <View style={styles.menuContainer}>
                {menuItems.map((item, index) => (
                    <TouchableOpacity key={index} style={styles.menuItem} onPress={item.action}>
                        <Ionicons name={item.icon} size={24} color={isDarkMode ? '#fff' : '#000'} />
                        <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' }]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
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
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 20,
    },
    themeToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    menuContainer: {
        marginTop: 20,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuText: {
        fontSize: 16,
        marginLeft: 15,
    },
});

export default Sidebar;