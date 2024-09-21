// components/TaskFilter.js
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextSizeContext } from '../src/context/TextSizeContext';

export default function TaskFilter({ filter, setFilter }) {

  const { textSize } = useContext(TextSizeContext);

  return (
    <View style={styles.container}>
      {['All', 'Active', 'Completed'].map((status) => (
        <TouchableOpacity
          key={status}
          style={[styles.button, filter === status && styles.selectedButton]}
          onPress={() => setFilter(status)}
        >
          <Text style={[styles.buttonText,{fontSize:textSize}]}>{status}</Text>
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