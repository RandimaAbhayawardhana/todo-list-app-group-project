// components/TaskFilter.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskFilter({ filter, setFilter }) {
  return (
    <View style={styles.container}>
      {['All', 'Active', 'Completed'].map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.button, filter === status && styles.selectedButton]}
          onPress={() => setFilter(status)}
        >
          <Text style={styles.buttonText}>{status}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  selectedButton: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
