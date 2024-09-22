import React, { useState, useEffect } from 'react';
import {
  View, TextInput, Text, TouchableOpacity, StyleSheet, Button, FlatList, Platform,
} from 'react-native';
import TodoItem from './TodoItem'; 
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import { Picker } from '@react-native-picker/picker';  
import * as Notifications from 'expo-notifications'; 
import * as Speech from 'expo-speech'; 
//import * as SpeechRecognition from 'some-speech-recognition-library';
import { useTheme } from '../App'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Voice from 'react-native-voice';
import { useWindowDimensions } from 'react-native';

let DateTimePicker;
if (Platform.OS === 'web') {
  DateTimePicker = require('react-datepicker').default;
  require('react-datepicker/dist/react-datepicker.css');
} else {
  DateTimePicker = require('@react-native-community/datetimepicker').default;
}

// Request notification permissions from the user
const requestPermissions = async () => {
  const { status } = await Notifications.requestPermissionsAsync();
  if (status !== 'granted') {
    alert('To keep you informed, please enable notification access in your settings.');
  }
};


const TodoList = () => {
  const [showInput, setShowInput] = useState(false);
  const { theme } = useTheme(); // Retrieve the active theme for consistent styling
  const [text, setText] = useState(''); // Hold the current task input
  const [dueDate, setDueDate] = useState(new Date()); // Store selected due date
  const { width, height } = useWindowDimensions(); // Dynamically capture screen dimensions
  const [tasks, setTasks] = useState([]); // Manage the list of tasks
  const [dueTime, setDueTime] = useState(new Date()); // Store selected due time
  const [filteredTasks, setFilteredTasks] = useState([]); // Store tasks after applying filters
  const [showStarred, setShowStarred] = useState(false); // Toggle display of starred tasks
  const [starredTasks, setStarredTasks] = useState([]);
  const [isListening, setIsListening] = useState(false); // Track the status of speech-to-text input
  const [priority, setPriority] = useState('Medium'); // Set task priority (default: Medium)
  const [showDatePicker, setShowDatePicker] = useState(false); // Control visibility of date picker
  const [showTimePicker, setShowTimePicker] = useState(false); // Control visibility of time picker
  const [sortOption, setSortOption] = useState('Date'); // Manage task sorting options
  const [isSortDropdownVisible, setSortDropdownVisible] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Sort by');
  
  

  
  useEffect(() => {
    const loadTasks = async () => {
      try {
        const savedTasks = await AsyncStorage.getItem('tasks');
        if (savedTasks !== null) {
          setTasks(JSON.parse(savedTasks)); 
        }
      } catch (error) {
        console.error('Failed to load tasks:', error);
      }
    };
    loadTasks();
  }, []);


   // Save tasks to AsyncStorage whenever they are updated
   useEffect(() => {
    const saveTasks = async () => {
      try {
        await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    };

    if (tasks.length > 0) {
      saveTasks();
    }
  }, [tasks]);
   

  useEffect(() => {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });
    requestPermissions();
  }, []);

  //Function to schedule a notification for an upcoming task
  const scheduleTaskNotification = (task) => {
    const dueDateTime = new Date(task.dueDate);
    dueDateTime.setHours(new Date(task.dueTime).getHours());
    dueDateTime.setMinutes(new Date(task.dueTime).getMinutes());

    const triggerTime = dueDateTime.getTime();

    if (triggerTime > Date.now()) {
      Notifications.scheduleNotificationAsync({
        content: {
          title: "Upcoming Task Reminder",
          body: `Your task "${task.text}" is due soon. Stay on top of your schedule!`,
          data: { taskId: task.id },
        },
        trigger: {
          seconds: (triggerTime - Date.now()) / 1000, 
        },
      });
    }
  };


  const isValidTask = (task) => {
    if (!task.trim()) return false;
  
    const regex = /^[^a-zA-Z]+$/;
    if (task.length <= 1 || regex.test(task)) return false;
  
    return true;
  };
  

  const resetInputs = () => {
    setText('');
    setDueDate(new Date());
    setDueTime(new Date());
    setPriority('Medium');
    setFilteredTasks([]);
  };

  // Adding subtasks
  const addSubtask = (taskId, subtaskText) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === taskId ? { ...task, subtasks: [...task.subtasks, { text: subtaskText, completed: false }] } : task
      )
    );
  };

  const addTask = () => {
    if (!isValidTask(text)) {
      alert('Invalid task! Please ensure tasks include letters and are not empty or made up of symbols only.');
      return;
    }

    const now = new Date();
    const selectedDateTime = new Date(dueDate);
    selectedDateTime.setHours(dueTime.getHours());
    selectedDateTime.setMinutes(dueTime.getMinutes());

    if (selectedDateTime <= now) {
      alert('The selected date and time has already passed.');
      return;
    }

    const newTask = { 
      id: Date.now(), 
      text, 
      completed: false, 
      dueDate: dueDate.toISOString(), 
      dueTime: dueTime.toISOString(), 
      priority,
      subtasks: [],
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    scheduleTaskNotification(newTask);
    resetInputs();
  };

  const toggleSubtask = (taskId, subtaskIndex) => {
    setTasks(prevTasks => {
      return prevTasks.map(task => {
        if (task.id === taskId) {
          const updatedSubtasks = task.subtasks.map((subtask, index) => {
            return index === subtaskIndex 
              ? { ...subtask, completed: !subtask.completed } 
              : subtask;
          });
          return { ...task, subtasks: updatedSubtasks };
        }
        return task;
      });
    });
  };
  

  const handleTextChange = (input) => {
    setText(input);
    if (input.length > 0) {
      const suggestions = tasks.filter(task => 
        task.text.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredTasks(suggestions);
    } else {
      setFilteredTasks([]);
    }
  };

  // Sorting logic
  const getSortedTasks = () => {
    let sortedTasks = [...tasks];
    switch (selectedSort) {
      case 'Sort by Priority':
        sortedTasks = sortedTasks.sort((a, b) => {
          const priorityMap = { Low: 1, Medium: 2, High: 3 };
          return priorityMap[a.priority] - priorityMap[b.priority];
        });
        break;
      case 'Sort by Date':
        sortedTasks = sortedTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
        break;
      case 'Sort by Completed':
        sortedTasks = sortedTasks.sort((a, b) => a.completed - b.completed);
        break;
      default:
        break;
    }
    return sortedTasks;
  };

  const sortedTasks = getSortedTasks();

  const toggleCompleted = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, completed: !task.completed } : task))
    );
  };

  // Function to toggle star status of a task
  const toggleStarred = (id) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, starred: !task.starred } : task
    );
  
    setTasks(updatedTasks);
    setStarredTasks(updatedTasks.filter(task => task.starred));
  };

  const startListening = async () => {
    if (!isListening) {
      setIsListening(true);
      try {
        await Voice.start('en-US');
        Voice.onSpeechResults = (event) => setText(event.value[0]);
        Voice.onSpeechError = (error) => console.error('Error with voice recognition: ', error);
      } catch (error) {
        console.error('Error starting voice recognition: ', error);
      }
    } else {
      await Voice.stop();
      setIsListening(false);
    }
  };
  

  const renderTimePicker = () => (
    showTimePicker && (
      Platform.OS !== 'web' ? (
        <DateTimePicker
          value={dueTime}
          mode="time"
          display="default"
          onChange={(event, time) => {
            setShowTimePicker(false);
            if (time) setDueTime(time);
          }}
        />
      ) : (
        <DateTimePicker
          selected={dueTime}
          onChange={(time) => {
            setShowTimePicker(false);
            setDueTime(time);
          }}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={15}
          timeCaption="Time"
          dateFormat="h:mm aa"
        />
      )
    )
  );

  const renderDatePicker = () => (
    showDatePicker && (
      Platform.OS !== 'web' ? (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(false);
            if (date) setDueDate(date);
          }}
        />
      ) : (
        <DateTimePicker
          selected={dueDate}
          onChange={(date) => {
            setShowDatePicker(false);
            setDueDate(date);
          }}
          dateFormat="MMMM d, yyyy"
        />
      )
    )
  );


  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={sortedTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TodoItem
            task={item}
            deleteTask={() => setTasks(tasks.filter(task => task.id !== item.id))}
            toggleCompleted={toggleCompleted}
            editTask={(id, newText) => setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task))}
            toggleStarred={toggleStarred}
            addSubtask={addSubtask}
            toggleSubtask={toggleSubtask}
          />
        )}
        contentContainerStyle={styles.taskList}
      />
  
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.plusButton} onPress={() => setShowInput(!showInput)}>
          <Icon name="plus" size={30} style={styles.plusIcon} />
        </TouchableOpacity>
  
        {showInput && (
          <>
            <TextInput
              style={[styles.textInput, { color: theme.colors.text }]}
              value={text}
              onChangeText={setText}
              placeholder="Add a new task"
              placeholderTextColor={theme.colors.placeholder}
            />
  
            <View style={styles.priorityContainer}>
              <Text style={{ color: theme.colors.text }}>Priority:</Text>
              <Picker
                selectedValue={priority}
                onValueChange={(itemValue) => setPriority(itemValue)}
                style={[styles.priorityPicker, { color: theme.colors.text }]}
              >
                <Picker.Item label="Low" value="Low" />
                <Picker.Item label="Medium" value="Medium" />
                <Picker.Item label="High" value="High" />
              </Picker>
            </View>
  
            <View style={styles.iconContainer}>
              <TouchableOpacity style={styles.iconButton} onPress={() => { setShowTimePicker(false); setShowDatePicker(true); }}>
                <Icon name="calendar" size={26} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton} onPress={() => { setShowDatePicker(false); setShowTimePicker(true); }}>
                <Icon name="clock" size={26} style={styles.icon} />
              </TouchableOpacity>
            </View>
  
            <TouchableOpacity style={styles.addButton} onPress={addTask}>
              <Text style={styles.addButtonText}>Add Task</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
  
      {renderDatePicker()}
      {renderTimePicker()}
  
      <Text style={[styles.dateText, { color: theme.colors.text }]}>
        {`${dueDate.toLocaleDateString()} ${dueTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
      </Text>

      {/* Filter and Sort Options */}
      <View style={styles.sortContainer}>
        <TouchableOpacity style={styles.filterButton} onPress={() => setSortDropdownVisible(!isSortDropdownVisible)}>
          <Text style={styles.filterButtonText}>Filter</Text>
          <Icon name={isSortDropdownVisible ? 'chevron-up' : 'chevron-down'} size={20} style={styles.filterIcon} />
        </TouchableOpacity>

        {isSortDropdownVisible && (
          <View style={styles.dropdown}>
            {['Sort by Priority', 'Sort by Date', 'Sort by Completed'].map(option => (
              <TouchableOpacity key={option} onPress={() => { setSelectedSort(option); setSortDropdownVisible(false); }}>
                <Text style={styles.dropdownItem}>{option}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <Text style={styles.selectedSortText}>{selectedSort}</Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  inputContainer: {
    flexDirection: 'column',
    marginTop: 15,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  textInput: {
    fontSize: 16,
    padding: 12,
    color: '#333',
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginBottom: 10,
  },
  priorityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    backgroundColor: '#fdfdfd',
  },
  priorityPicker: {
    height: 40,
    width: 160,
    marginLeft: 12,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  iconButton: {
    padding: 10,
  },
  addButton: {
    backgroundColor: '#4caf50',
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  dateText: {
    marginTop: 12,
    fontSize: 16,
    color: '#888',
  },
  sortContainer: {
    marginTop: 20,
  },
  filterButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  filterButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  filterIcon: {
    color: '#fff',
    marginLeft: 10,
  },
  dropdown: {
    marginTop: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  dropdownItem: {
    padding: 10,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  selectedSortText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  todoItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  todoText: {
    fontSize: 18,
    color: '#333',
  },
  priorityText: {
    color: '#888',
    fontSize: 14,
  },
});

export default TodoList;
