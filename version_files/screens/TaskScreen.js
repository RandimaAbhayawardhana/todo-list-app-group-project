
import React, { useState, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, SectionList, StyleSheet, Modal, Button } from 'react-native';
import TodoItem from '../components/TodoItem';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function TaskScreen({ route  }) {
  const { listId , setTaskLists , lists } = route.params;
  const [selectedList, setSelectedList] = useState(null);
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [search, setSearch] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [localList , setLocalList] = useState([])
  const [completedList , setCompletedList] = useState([])
  const [incompletedList , setInCompletedList] = useState([])

  useEffect(() => {
    setLocalList(lists)
  }, [lists])

  useEffect(() => {
    const list = localList.find(list => list.id === listId);
    setSelectedList(list || { tasks: [] });
    console.log('changed')
  }, [listId , localList]);

  // Filter tasks based on search query
  useEffect(() => {    
    
    if(search == '' && selectedList){
      handlePrepareLists()
    }

    if(selectedList){
      setInCompletedList(selectedList.tasks.filter(task => !task.completed).filter(task =>task.text.toLowerCase().includes(search.toLowerCase())))
      setCompletedList(selectedList.tasks.filter(task => task.completed).filter(task =>task.text.toLowerCase().includes(search.toLowerCase())))
    }
    
  }, [search])

  useEffect(() => {
    handlePrepareLists();
  }, [selectedList])

  const handlePrepareLists = () => {
    if(selectedList){
      setInCompletedList(selectedList.tasks.filter(task => !task.completed))
      setCompletedList(selectedList.tasks.filter(task => task.completed))
    }
  }

  // Add a new task
  const addTask = () => {
    if (text.trim() !== '') {
      const newTask = { id: Date.now(), text, description, completed: false, dueDate };
      const updatedLists = localList.map(list =>
        list.id === listId
          ? { ...list, tasks: [...list.tasks, newTask] }
          : list
      );
      console.log("updated list ----> " , updatedLists)
      // setLists(updatedLists);
      setTaskLists(updatedLists)
      setLocalList(updatedLists)
      setText('');
      setDescription('');
      setDueDate(new Date());
      setModalVisible(false);
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
    const updatedLists = localList.map(list =>
      list.id === listId
        ? { ...list, tasks: list.tasks.filter(task => task.id !== taskId) }
        : list
    );
    setTaskLists(updatedLists);
    setLocalList(updatedLists)
  };

  // Toggle task completion status
  const toggleCompleted = (taskId) => {
    const updatedLists = localList.map(list =>
      list.id === listId
        ? {
            ...list,
            tasks: list.tasks.map(task =>
              task.id === taskId ? { ...task, completed: !task.completed } : task
            ),
          }
        : list
    );
    setTaskLists(updatedLists);
    setLocalList(updatedLists)
  };

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
        sections={[
          { title: 'Incomplete Tasks', data: incompletedList },
          { title: 'Completed Tasks', data: completedList }
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
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        ListHeaderComponent={
          <View style={styles.inputContainer}>
            <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
              <Text style={styles.addButtonText}>Add New Task</Text>
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
            style={styles.textInput}
          />
          <TextInput
            placeholder="Task Description"
            value={description}
            onChangeText={setDescription}
            style={styles.textInput}
          />
          
          <TouchableOpacity onPress={() => setShowDatePicker(true)}>
            <Text>Select Due Date: {dueDate.toDateString()}</Text>
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
    fontSize: 16,
    padding: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#333',
  },
  sectionHeader: {
    fontSize: 18,
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
    fontSize: 16,
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
    fontSize: 16,
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
});