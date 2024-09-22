import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const LoginScreen = ({ navigation, setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Regex for password validation: at least 8 characters, 
    // includes uppercase, lowercase, numbers, and special characters
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (!username || !password) {
      alert('Please enter both username and password');
      return;
    }

    if (!passwordRegex.test(password)) {
      alert('Password must be at least 8 characters long and include uppercase, lowercase letters, numbers, and special characters.');
      return;
    }

    setUser({ username });
    navigation.replace('Main');
  };

  return (
    <ImageBackground
      source={require('../assets/background.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />
      <View style={styles.container}>
        <Text style={styles.tagline}>Easily Manage Your Tasks...</Text>
        <TextInput 
          style={styles.input} 
          placeholder="Username" 
          value={username}
          onChangeText={setUsername}
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
          returnKeyType="done" 
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.footer}>
          Don't have an account?{' '}
          <Text style={styles.link} onPress={() => navigation.navigate('SignUp')}>
            Create one here
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    width: width,
    height: height,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: width,
    height: height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tagline: {
    fontSize: 20,
    marginBottom: 35,
    textAlign: 'center',
    color: '#A0A0A0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#555',
    padding: 14,
    borderRadius: 28,
    marginBottom: 18,
    backgroundColor: '#282828',
    fontSize: 17,
    width: '70%',
    color: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  button: {
    backgroundColor: '#2C3E50',
    paddingVertical: 14,
    borderRadius: 30,
    width: '65%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 5,
  },
  buttonText: {
    color: '#ECF0F1',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  footer: {
    fontSize: 16,
    textAlign: 'center',
    color: '#A5A5A5',
    marginTop: 25,
  },
  link: {
    color: '#2C3E50',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
