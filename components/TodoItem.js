import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, Image } from 'react-native';
import CheckBox from 'expo-checkbox';
import { Swipeable } from 'react-native-gesture-handler';
import * as ImagePicker from 'expo-image-picker';

export default function TodoItem({ task, deleteTask, toggleCompleted, editTask }) {
  const [isEditModalVisible, setEditModalVisible] = useState(false);
  const [isViewModalVisible, setViewModalVisible] = useState(false);
  const [newTaskText, setNewTaskText] = useState(task.text);
  const [notes, setNotes] = useState(task.notes || '');
  const [attachment, setAttachment] = useState(task.attachment || null);

  const handleEdit = () => {
    editTask(task.id, { text: newTaskText, notes, attachment });
    setEditModalVisible(false);
  };

  const handleAddAttachment = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setAttachment(result.assets[0].uri);
    }
  };

  const renderRightActions = () => (
    <View style={styles.actionsContainer}>
      <TouchableOpacity onPress={() => deleteTask(task.id)} style={styles.deleteButton}>
        <Text style={styles.actionText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <View style={styles.todoItem}>
        <CheckBox
          value={task.completed}
          onValueChange={() => toggleCompleted(task.id)}
          tintColors={{ true: '#4CAF50', false: '#ccc' }}
        />
        <Text style={[styles.taskText, task.completed && styles.completedText]}>{task.text}</Text>

        {/* View Button */}
        <TouchableOpacity style={styles.viewButton} onPress={() => setViewModalVisible(true)}>
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>

        {/* Edit Button */}
        <TouchableOpacity style={styles.editButton} onPress={() => setEditModalVisible(true)}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>

        {/* Edit Task Modal */}
        <Modal visible={isEditModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <TextInput
                style={styles.modalInput}
                value={newTaskText}
                onChangeText={setNewTaskText}
                placeholder="Edit task"
              />
              <TextInput
                style={styles.modalInput}
                value={notes}
                onChangeText={setNotes}
                placeholder="Add notes"
              />
              <TouchableOpacity onPress={handleAddAttachment} style={styles.attachmentButton}>
                <Text style={styles.attachmentButtonText}>Add Attachment</Text>
              </TouchableOpacity>
              {attachment && <Image source={{ uri: attachment }} style={styles.attachmentImage} />}
              <TouchableOpacity style={styles.modalButton} onPress={handleEdit}>
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* View Task Modal */}
        <Modal visible={isViewModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Task Details</Text>
              <Text style={styles.taskDetailText}>Task: {task.text}</Text>
              <Text style={styles.taskDetailText}>Notes: {notes}</Text>
              {attachment && (
                <Image source={{ uri: attachment }} style={styles.attachmentImage} />
              )}
              <Text style={styles.taskDetailText}>
                Status: {task.completed ? 'Completed' : 'Incomplete'}
              </Text>
              <TouchableOpacity style={styles.modalButton} onPress={() => setViewModalVisible(false)}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </Swipeable>
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
  viewButton: {
    backgroundColor: '#FFA500',
    padding: 5,
    marginRight: 10,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    backgroundColor: '#FF6347',
    width: 100,
    height: '100%',
    borderRadius: 5,
  },
  deleteButton: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  actionText: {
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: 300,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskDetailText: {
    fontSize: 16,
    marginVertical: 5,
  },
  modalInput: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
    padding: 10,
  },
  modalButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  attachmentButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  attachmentButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
  attachmentImage: {
    width: 100,
    height: 100,
    marginTop: 10,
  },
});
