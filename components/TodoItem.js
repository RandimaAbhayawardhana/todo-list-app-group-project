import Checkbox from 'expo-checkbox';
import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  todoItem: {
    padding: 16,
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderColor: '#e0e0e0',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoItemText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
    marginLeft: 10,
    fontWeight: '600',
  },
  completed: {
    textDecorationLine: 'line-through',
    color: '#bbb',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#1d4ed8',
  },
  buttonIcon: {
    color: '#fff',
    fontSize: 20,
  },
  textInput: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#d1d5db',
    backgroundColor: '#f7f9fc',
    borderRadius: 6,
  },
  detailsContainer: {
    marginTop: 10,
    paddingHorizontal: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#6b7280',
  },
  subtaskContainer: {
    marginTop: 10,
  },
  subtaskText: {
    paddingVertical: 6,
    fontSize: 16,
  },
  addSubtaskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  addSubtaskInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#d1d5db',
    paddingHorizontal: 10,
    borderRadius: 6,
    backgroundColor: '#ffffff',
  },
  addSubtaskButton: {
    marginLeft: 10,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#34d399',
  },
  showDetailsButton: {
    marginTop: 10,
    backgroundColor: '#2563eb',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
});

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask, toggleStarred, addSubtask, toggleSubtask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);
  const [showDetails, setShowDetails] = useState(false);
  const [newSubtaskText, setNewSubtaskText] = useState('');
  const inputRef = useRef(null);

  function handleSave() {
    if (newText.trim() !== '') {
      editTask(task.id, newText);
      setIsEditing(false);
    } else {
      setIsEditing(false);
    }
  }

  function handleAddSubtask() {
    if (newSubtaskText.trim() !== '') {
      addSubtask(task.id, newSubtaskText);
      setNewSubtaskText('');
    }
  }

  const handleDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => deleteTask(task.id),
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  return (
    <View style={styles.todoItem}>
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }}
        />
        {isEditing ? (
          <TextInput
            ref={inputRef}
            style={styles.textInput}
            value={newText}
            onChangeText={setNewText}
            onSubmitEditing={handleSave}
            returnKeyType="done"
          />
        ) : (
          <Text style={[styles.todoItemText, task.completed && styles.completed]}>
            {task.text}
          </Text>
        )}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => toggleStarred(task.id)}
          >
            <Icon
              name={task.starred ? "star" : "star-outline"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => (isEditing ? handleSave() : setIsEditing(true))}
          >
            <Icon
              name={isEditing ? "content-save" : "pencil"}
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={handleDelete}
          >
            <Icon
              name="trash-can"
              style={styles.buttonIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.subtaskContainer}>
        <FlatList
          data={task.subtasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={styles.checkboxContainer}>
              <Checkbox
                value={item.completed}
                onValueChange={() => toggleSubtask(task.id, index)}
              />
              <Text style={[styles.subtaskText, item.completed && styles.completed]}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      <View style={styles.addSubtaskContainer}>
        <TextInput
          style={styles.addSubtaskInput}
          value={newSubtaskText}
          onChangeText={setNewSubtaskText}
          placeholder="Add Subtask"
        />
        <TouchableOpacity style={styles.addSubtaskButton} onPress={handleAddSubtask}>
          <Icon name="plus" style={styles.buttonIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.showDetailsButton}
        onPress={() => setShowDetails(!showDetails)}
      >
        <Icon
          name={showDetails ? "chevron-up" : "chevron-down"}
          size={24}
          color="#fff"
        />
      </TouchableOpacity>

      {showDetails && (
        <View style={styles.detailsContainer}>
          <Text style={styles.detailText}>
            Due Date: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'None'}
          </Text>
          <Text style={styles.detailText}>
            Due Time: {task.dueTime ? new Date(task.dueTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'None'}
          </Text>
          <Text style={styles.detailText}>
            Created At: {task.id ? new Date(task.id).toLocaleString([], { hour: '2-digit', minute: '2-digit', month: 'long', day: 'numeric', year: 'numeric' }) : 'None'}
          </Text>
          <Text style={styles.detailText}>Priority: {task.priority}</Text>
        </View>
      )}
    </View>
  );
}
