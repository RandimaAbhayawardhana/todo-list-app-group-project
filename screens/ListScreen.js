// screens/ListScreen.js
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert, TextInput, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function ListScreen() {
  const navigation = useNavigation();
  const [lists, setLists] = useState([{ id: 1, name: 'Personal', tasks: [] }, { id: 2, name: 'Work', tasks: [] }]);
  const [newListName, setNewListName] = useState('');
  const [modalVisible, setModalVisible] = useState(false); // For adding a new list

  const handleSelectList = (listId) => {
    navigation.navigate('TaskScreen', { listId });
  };

  const deleteList = (listId) => {
    Alert.alert(
      'Delete Task List',
      'Are you sure you want to delete this task list?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setLists(lists.filter(list => list.id !== listId)),
        },
      ]
    );
  };

  const addNewList = () => {
    if (newListName.trim()) {
      const newList = { id: Date.now(), name: newListName, tasks: [] };
      setLists([...lists, newList]);
      setNewListName('');
      setModalVisible(false); // Close modal after adding the list
    } else {
      Alert.alert('Error', 'Please enter a list name.');
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={list => list.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity style={styles.listButton} onPress={() => handleSelectList(item.id)}>
              <Text style={styles.listButtonText}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => deleteList(item.id)}>
              <Icon name="delete" size={24} color="#FF6347" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Add New List Button */}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Icon name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* Modal for adding a new task list */}
      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Enter Task List Name</Text>
            <TextInput
              style={styles.textInput}
              value={newListName}
              onChangeText={setNewListName}
              placeholder="New List Name"
            />
            <Button title="Add List" onPress={addNewList} />
            <Button title="Cancel" color="red" onPress={() => setModalVisible(false)} />
          </View>
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
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    elevation: 2,
  },
  listButtonText: {
    fontSize: 18,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#4CAF50',
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: 300,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
});