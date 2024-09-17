// screens/TaskScreen.js

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, SectionList, StyleSheet } from 'react-native';
import TodoItem from '../components/TodoItem'; // Import your existing TodoItem component

export default function TaskScreen({ route }) {
  const { listId } = route.params;
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Personal',
      tasks: [
        { id: 1, text: 'Doctor Appointment', completed: true },
        { id: 2, text: 'Meeting at School', completed: false },
      ],
    },
    {
      id: 2,
      name: 'Work',
      tasks: [
        { id: 3, text: 'Submit Report', completed: false },
        { id: 4, text: 'Team Meeting', completed: false },
      ],
    },
  ]);

  const [text, setText] = useState('');
  const [search, setSearch] = useState('');
  const [selectedList, setSelectedList] = useState(null);

  // Update selected list when listId changes
  useEffect(() => {
    const list = lists.find(list => list.id === listId);
    setSelectedList(list || { tasks: [] });
  }, [listId, lists]);

  // Filter tasks based on search query
  const filteredTasks = selectedList?.tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  ) || [];

  // Add a new task
  const addTask = () => {
    if (text.trim() !== '') {
      const newTask = { id: Date.now(), text, completed: false };
      setLists(lists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      ));
      setText('');
    }
  };

  // Delete a task
  const deleteTask = taskId => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    ));
  };

  // Toggle task completion status
  const toggleCompleted = taskId => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          }
        : list
    ));
  };

  // Render each task item
  const renderTask = ({ item }) => (
    <TodoItem task={item} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
  );

  // Sections for incomplete and completed tasks
  const sections = [
    {
      title: 'Incomplete Tasks',
      data: filteredTasks.filter(task => !task.completed),
    },
    {
      title: 'Completed Tasks',
      data: filteredTasks.filter(task => task.completed),
    },
  ];

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Tasks"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={sections}
        keyExtractor={task => task.id.toString()}
        renderItem={renderTask}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="New Task"
              placeholderTextColor="#999"
              value={text}
              onChangeText={setText}
            />
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  searchInput: {
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    color: '#333',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#666',
  },
});
