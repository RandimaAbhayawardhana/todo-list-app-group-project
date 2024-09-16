//TODO item
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Checkbox from 'expo-checkbox';

const styles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    marginVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  checkboxContainer: {
    marginRight: 12,
  },
  todoItemText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  editButton: {
    marginRight: 8,
    backgroundColor: '#1E90FF',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  viewButton: {
    marginRight: 8,
    backgroundColor: '#4682B4',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    fontSize: 16,
    padding: 8,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  taskDetails: {
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isViewing, setIsViewing] = useState(false);
  const [editText, setEditText] = useState(task.text);
  const [editDescription, setEditDescription] = useState(task.description || '');
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (editText.trim() === '') {
      console.log('Task text is empty');
      return;
    }
    editTask(task.id, { text: editText, description: editDescription, dueDate: editDueDate });
    setIsEditing(false);
  };

  return (
    <>
      <View style={styles.todoItem}>
        <View style={styles.checkboxContainer}>
          <Checkbox
            value={task.completed}
            onValueChange={() => toggleCompleted(task.id)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[styles.todoItemText, task.completed && styles.completed]}>
            {task.text}
          </Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.viewButton}
            onPress={() => setIsViewing(true)}
          >
            <Text style={styles.viewButtonText}>View</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => deleteTask(task.id)}
          >
            <Text style={styles.deleteButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </View>

      {isEditing && (
        <Modal
          transparent={true}
          visible={isEditing}
          onRequestClose={() => setIsEditing(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                value={editText}
                onChangeText={setEditText}
                placeholder="Task Title"
              />
              <TextInput
                style={styles.modalInput}
                value={editDescription}
                onChangeText={setEditDescription}
                placeholder="Description"
              />
              <TextInput
                style={styles.modalInput}
                value={editDueDate}
                onChangeText={setEditDueDate}
                placeholder="Due Date (e.g., 2024-12-31)"
              />
              <TouchableOpacity style={styles.modalButton} onPress={handleSave}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsEditing(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {isViewing && (
        <Modal
          transparent={true}
          visible={isViewing}
          onRequestClose={() => setIsViewing(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.taskDetails}>Title: {task.text}</Text>
              <Text style={styles.taskDetails}>Description: {task.description}</Text>
              <Text style={styles.taskDetails}>Due Date: {task.dueDate}</Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setIsViewing(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </>
  );
}

// TODO LIST

import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import TodoItem from './TodoItem';
import { v4 as uuidv4 } from 'uuid';

const styles = StyleSheet.create({
  // Define your styles here...
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  addButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  clearButton: {
    marginTop: 15,
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
    fontSize: 16,
    padding: 8,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default function TodoList() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const inputRef = useRef(null);

  function addTask() {
    if (text.trim() !== '') {
      const newTask = { id: uuidv4(), text, description, dueDate, completed: false };
      setTasks([...tasks, newTask]);
      setText('');
      setDescription('');
      setDueDate('');
      setIsModalVisible(false);
      inputRef.current?.focus();
    }
  }

  function deleteTask(id) {
    setTasks(tasks.filter(task => task.id !== id));
  }

  function toggleCompleted(id) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)));
  }

  function editTask(id, updatedTask) {
    setTasks(tasks.map(task => (task.id === id ? { ...task, ...updatedTask } : task)));
  }

  function clearAllTasks() {
    setTasks([]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TodoItem
            key={item.id}
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        )}
        ListEmptyComponent={<Text>No tasks available</Text>} // Debugging message
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Task</Text>
      </TouchableOpacity>
      {tasks.length > 0 && (
        <TouchableOpacity style={styles.clearButton} onPress={clearAllTasks}>
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}
      {isModalVisible && (
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.modalInput}
              value={text}
              onChangeText={setText}
              placeholder="Task Title"
            />
            <TextInput
              style={styles.modalInput}
              value={description}
              onChangeText={setDescription}
              placeholder="Description"
            />
            <TextInput
              style={styles.modalInput}
              value={dueDate}
              onChangeText={setDueDate}
              placeholder="Due Date (e.g., 2024-12-31)"
            />
            <TouchableOpacity style={styles.modalButton} onPress={addTask}>
              <Text style={styles.modalButtonText}>Save</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => setIsModalVisible(false)}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}
//APP

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TodoList from './components/TodoList';
import Checkbox from 'expo-checkbox';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff0000', // Changed color to red
    justifyContent: 'center',
  },
});

