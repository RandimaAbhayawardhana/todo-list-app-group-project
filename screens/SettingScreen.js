import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useTheme } from '../App';

const SettingsScreen = ({ navigation }) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.colors.card }]}>
        <TouchableOpacity
          style={styles.arrowButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons name="chevron-left" size={28} color={theme.colors.text} />
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.colors.text }]}>Settings</Text>
      </View>

      {/* Menu Options */}
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('AccountSettingsScreen')}
      >
        <MaterialIcons name="account-circle" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Account Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="language" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Language</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="notifications" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Notifications</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="privacy-tip" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Privacy Settings</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="feedback" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="help-outline" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Help & Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <MaterialIcons name="share" size={24} color="#FFD700" />
        <Text style={[styles.menuText, { color: theme.colors.text }]}>Share App</Text>
      </TouchableOpacity>

      {/* Version Information */}
      <View style={styles.versionContainer}>
        <Text style={[styles.versionText, { color: theme.colors.text }]}>Version: 2.3.28</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    alignItems: 'center',
    backgroundColor: '#1C1C1E',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 40,
    color: '#F0F0F3',
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
    borderBottomWidth: 0.5,
    borderBottomColor: '#3A3A3C',
  },
  menuText: {
    paddingLeft: 15,
    fontSize: 16,
    color: '#E5E5EA',
  },
  versionContainer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: '#E9DCC9',
  },
  versionText: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#E5E5EA',
  },
});

export default SettingsScreen;
