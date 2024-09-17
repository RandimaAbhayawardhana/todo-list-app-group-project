import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, FlatList, SectionList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon
import TodoItem from './TodoItem'; // Import your TodoItem component

export default function TodoList() {
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

  const [selectedListId, setSelectedListId] = useState(1); // Selects the first list initially
  const [text, setText] = useState('');
  const [newListName, setNewListName] = useState('');
  const [search, setSearch] = useState('');

  const selectedList = lists.find(list => list.id === selectedListId) || {}; // Fallback for undefined list
  const filteredTasks = selectedList.tasks ? selectedList.tasks.filter(task =>
    task.text.toLowerCase().includes(search.toLowerCase())
  ) : [];

  // Add a task to the selected list
  const addTask = () => {
    if (text.trim() !== '') {
      const newTask = { id: Date.now(), text, completed: false };
      setLists(
        lists.map(list =>
          list.id === selectedListId
            ? { ...list, tasks: [...list.tasks, newTask] }
            : list
        )
      );
      setText('');
    }
  };

  // Delete a task from the selected list
  const deleteTask = taskId => {
    setLists(
      lists.map(list =>
        list.id === selectedListId
          ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
          : list
      )
    );
  };

  // Toggle task completion status
  const toggleCompleted = taskId => {
    setLists(
      lists.map(list =>
        list.id === selectedListId
          ? {
              ...list,
              tasks: list.tasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
              ),
            }
          : list
      )
    );
  };

  // Add a new list
  const addList = () => {
    if (newListName.trim() !== '') {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setLists([...lists, newList]);
      setSelectedListId(newList.id); // Automatically select the new list
      setNewListName('');
    }
  };

  // Delete a list
  const deleteList = (listId) => {
    if (lists.length === 1) {
      Alert.alert('Error', 'You cannot delete the last list!');
      return;
    }
    Alert.alert(
      'Delete List',
      'Are you sure you want to delete this list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            const updatedLists = lists.filter(list => list.id !== listId);
            setLists(updatedLists);
            // Automatically select the first list after deletion
            setSelectedListId(updatedLists.length > 0 ? updatedLists[0].id : null);
          },
        },
      ]
    );
  };

  // Render each task item
  const renderTask = ({ item }) => (
    <TodoItem task={item} deleteTask={deleteTask} toggleCompleted={toggleCompleted} />
  );

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
      {/* Top List Selector */}
      <SectionList
        sections={sections}
        keyExtractor={task => task.id.toString()}
        renderItem={renderTask}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={
          <>
            <FlatList
              horizontal
              data={lists}
              keyExtractor={list => list.id.toString()}
              renderItem={({ item }) => (
                <View style={styles.listHeaderContainer}>
                  <TouchableOpacity
                    style={[
                      styles.listButton,
                      item.id === selectedListId && styles.selectedListButton,
                    ]}
                    onPress={() => setSelectedListId(item.id)}
                  >
                    <Text style={styles.listButtonText}>{item.name}</Text>
                  </TouchableOpacity>
                  {/* Delete List Icon */}
                  <TouchableOpacity
                    style={styles.deleteListButton}
                    onPress={() => deleteList(item.id)}
                  >
                    <Icon name="delete" size={24} color="#FF6347" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TextInput
              style={styles.searchInput}
              placeholder="Search Tasks"
              placeholderTextColor="#999"
              value={search}
              onChangeText={setSearch}
            />
          </>
        }
      />

      {/* Add New Task */}
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

      {/* Add New List */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="New List Name"
          placeholderTextColor="#999"
          value={newListName}
          onChangeText={setNewListName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addList}>
          <Text style={styles.addButtonText}>Add List</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f2f2f2',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
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
  listHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listButton: {
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  selectedListButton: {
    backgroundColor: '#4CAF50',
  },
  listButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  deleteListButton: {
    marginLeft: 10,
  },
});
