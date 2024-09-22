import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const HelpAndSupportScreen = () => {
  const handleContactSupport = () => {
    Linking.openURL('mailto:support@example.com');
  };

  const handleFAQ = () => {
    // Logic to navigate to FAQ 
  };

  const handleChatSupport = () => {
    // Logic for live chat support
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Help & Support</Text>
      <Text style={styles.subtitle}>We're here to assist you!</Text>
      <Text style={styles.description}>
        If you have any questions or need assistance, feel free to reach out to us. Here are some options to get help:
      </Text>

      <TouchableOpacity style={styles.contactButton} onPress={handleContactSupport}>
        <Ionicons name="mail-outline" size={24} color="#FFF" />
        <Text style={styles.contactButtonText}>Email Support</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportButton} onPress={handleChatSupport}>
        <Ionicons name="chatbubbles-outline" size={24} color="#FFF" />
        <Text style={styles.supportButtonText}>Live Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.supportButton} onPress={handleFAQ}>
        <Ionicons name="book-outline" size={24} color="#FFF" />
        <Text style={styles.supportButtonText}>FAQ</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>Thank you for using our app!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 5,
    color: '#34495E',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 30,
    lineHeight: 24,
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28A745',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    marginBottom: 15,
  },
  contactButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  supportButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginLeft: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginTop: 20,
    textAlign: 'center',
  },
});

export default HelpAndSupportScreen;
