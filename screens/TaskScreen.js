// screens/TaskScreen.js

import React, { useState, useEffect, useContext } from 'react';
import { View, TextInput, Text, TouchableOpacity, SectionList, StyleSheet, Modal, Button } from 'react-native';
import TodoItem from '../components/TodoItem'; // Import your TodoItem component
import DateTimePicker from '@react-native-community/datetimepicker'; // Install if necessary: npm install @react-native-community/datetimepicker
import { TextSizeContext } from '../src/context/TextSizeContext';

export default function TaskScreen({ route }) {
  const { listId } = route.params;
  const { textSize } = useContext(TextSizeContext);
  const [lists, setLists] = useState([
    {
      id: 1,
      name: 'Personal',
      tasks: [
        { id: 1, text: 'Doctor Appointment', description: '', completed: true, dueDate: new Date() },
        { id: 2, text: 'Meeting at School', description: '', completed: false, dueDate: new Date() },
      ],
    },
    {
      id: 2,
      name: 'Work',
      tasks: [
        { id: 3, text: 'Submit Report', description: '', completed: false, dueDate: new Date() },
        { id: 4, text: 'Team Meeting', description: '', completed: false, dueDate: new Date() },
      ],
    },
  ]);
  
  const [selectedList, setSelectedList] = useState(null);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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
      const newTask = { id: Date.now(), text, description, completed: false, dueDate };
      const updatedLists = lists.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      );
      setLists(updatedLists);
      setText('');
      setDescription('');
      setDueDate(new Date());
      setModalVisible(false); // Close modal after adding task
    }
  };

  // Edit an existing task
  const editTask = (taskId) => {
    const taskToEdit = selectedList.tasks.find(task => task.id === taskId);
    setText(taskToEdit.text);
    setDescription(taskToEdit.description);
    setDueDate(new Date(taskToEdit.dueDate));
    setModalVisible(true);
    deleteTask(taskId); // Remove the task temporarily to update
  };

  // Delete a task
  const deleteTask = (taskId) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    );
    setLists(updatedLists);
  };

  // Toggle task completion status
  const toggleCompleted = (taskId) => {
    const updatedLists = lists.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          }
        : list
    );
    setLists(updatedLists);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={[styles.searchInput,{fontSize:textSize}]}
        placeholder="Search Tasks"
        placeholderTextColor="#999"
        value={search}
        onChangeText={setSearch}
      />
      <SectionList
        sections={[
          { title: 'Incomplete Tasks', data: filteredTasks.filter(task => !task.completed) },
          { title: 'Completed Tasks', data: filteredTasks.filter(task => task.completed) }
        ]}
        keyExtractor={task => task.id.toString()}
        renderItem={({ item }) => (
          <TodoItem 
            task={item}
            deleteTask={deleteTask}
            toggleCompleted={toggleCompleted}
            editTask={editTask}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={[styles.sectionHeader,{fontSize:textSize}]}>{title}</Text>
        )}
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={[styles.addButtonText,{fontSize:textSize}]}>Add New Task</Text>
            </TouchableOpacity>
          </View>
        }
      />

      {/* Modal for adding or editing a task */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalView}>
          <TextInput
            placeholder="Task Title"
            value={text}
            onChangeText={setText}
            style={[styles.textInput,{fontSize:textSize}]}
          />
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            style={[styles.textInput,{fontSize:textSize}]}
          />
          
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text style={{fontSize:textSize}}>Select Due Date: {dueDate.toDateString()}</Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={dueDate}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) setDueDate(selectedDate);
              }}
            />
          )}

          <Button title="Save Task" onPress={addTask} />
          <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
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
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  sectionHeader: {
    
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#666',
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
    padding: 10,
    color: '#333',
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 10,
    borderColor: '#ddd',
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
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});