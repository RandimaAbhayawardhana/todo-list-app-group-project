import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const SignUpScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    if (!username || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    
    Alert.alert('Success', 'You have successfully signed up!');

    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Please complete your registration here.</Text>

      <TextInput 
        style={styles.input} 
        placeholder="Username" 
        value={username}
        onChangeText={setUsername}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Email" 
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput 
        style={styles.input} 
        placeholder="Password" 
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#aaa"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Already have an account?{' '}
        <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
          Login here
        </Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1C1C1C',
    padding: 20,
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    color: '#E0E0E0',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#A0A0A0',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 14,
    marginBottom: 15,
    borderRadius: 28,
    backgroundColor: '#282828', 
    borderColor: '#555',
    borderWidth: 1,
    color: '#FFFFFF', 
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ECF0F1',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    color: '#A5A5A5',
    fontSize: 16,
  },
  link: {
    color: '#2C3E50',
    fontWeight: 'bold',
  },
});

export default SignUpScreen;
