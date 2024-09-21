import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Switch, TouchableOpacity, Text, Animated, Image, Modal, Button } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import icons
import Slider from '@react-native-community/slider';//Import slider for adjusting font size
import AsyncStorage from '@react-native-async-storage/async-storage';

const Sidebar = ({ onSearch, onToggleTheme, isDarkMode, isVisible, name, email, profileImage, onMenuSelect }) => {
    const slideAnim = useRef(new Animated.Value(-250)).current;

    // State for text size adjustment
    const [textSizeModalVisible, setTextSizeModalVisible] = useState(false);
    const [textSize, setTextSize] = useState(16);

    // Load text size from AsyncStorage when the app starts
    useEffect(() => {
        const loadTextSize = async () => {
            try {
                const storedSize = await AsyncStorage.getItem('textSize');
                if (storedSize !== null) {
                    setTextSize(parseInt(storedSize, 10));
                }
            } catch (error) {
                console.log('Failed to load text size from storage');
            }
        };

        loadTextSize();
    }, []);

    // Save text size to AsyncStorage whenever it changes
    const saveTextSize = async (size) => {
        try {
            await AsyncStorage.setItem('textSize', size.toString());
        } catch (error) {
            console.log('Failed to save text size to storage');
        }
    };

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
        { title: 'Text Size', icon: 'options', action: () => setTextSizeModalVisible(true) }, // Open text size modal
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
                    <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#000' ,fontSize: textSize}]}>{name || 'User Name'}</Text>
                    <Text style={{ color: isDarkMode ? '#ccc' : '#555',fontSize: textSize }}>{email || 'user@example.com'}</Text>
                </View>
            </View>

            {/* Search Input */}
            <TextInput
                style={[styles.searchInput, { borderColor: isDarkMode ? '#555' : '#ccc' ,fontSize: textSize}]}
                placeholder="Search..."
                onChangeText={onSearch}
                placeholderTextColor={isDarkMode ? '#ccc' : '#555'}
            />

            {/* Theme Toggle */}
            <View style={styles.themeToggle}>
                <Text style={{ color: isDarkMode ? '#fff' : '#000' ,fontSize: textSize}}>
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
                        <Ionicons name={item.icon} size={textSize} color={isDarkMode ? '#fff' : '#000'} />
                        <Text style={[styles.menuText, { color: isDarkMode ? '#fff' : '#000' ,fontSize: textSize}]}>{item.title}</Text>
                    </TouchableOpacity>
                ))}
            </View>

             {/* Text Size Adjustment Modal */}
             <Modal
                transparent={true}
                visible={textSizeModalVisible}
                animationType="slide"
                onRequestClose={() => setTextSizeModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Adjust Text Size</Text>
                        <Slider
                            style={{width: 200, height: 40}}
                            minimumValue={14}
                            maximumValue={25}
                            value={textSize}
                            onValueChange={(value) => setTextSize(value)}
                            step={1}
                        />
                        <Text style={styles.modalText}>Text Size: {textSize}</Text>
                        <Button 
                            title="OK" 
                            onPress={() => {
                                setTextSizeModalVisible(false);
                                saveTextSize(textSize); // Save the selected text size
                            }} 
                        />
                    </View>
                </View>
            </Modal>

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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        marginTop: 10,
        fontSize: 16,
    },
});

export default Sidebar;