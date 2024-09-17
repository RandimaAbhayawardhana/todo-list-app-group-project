// components/TodoItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import CheckBox from 'expo-checkbox'; // Use expo-checkbox if necessary

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  return (
    <View style={styles.todoItem}>
      <CheckBox
        value={task.completed}
        onValueChange={() => toggleCompleted(task.id)}
        tintColors={{ true: '#4CAF50', false: '#ccc' }}
      />
      <Text style={[styles.taskText, task.completed && styles.completedText]}>{task.text}</Text>

      {/* Edit Button */}
      <TouchableOpacity style={styles.editButton} onPress={() => editTask(task.id)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>

      {/* Delete Button */}
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(task.id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    borderRadius: 5,
    elevation: 1,
  },
  taskText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  editButton: {
    backgroundColor: '#2196F3',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});
