// screens/ListScreen.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import for navigation
import Icon from 'react-native-vector-icons/MaterialIcons'; // Import Icon
import TodoList from '../components/TodoList'; // Import your TodoList component

export default function ListScreen() {
  const navigation = useNavigation(); // Access navigation object
  const [lists, setLists] = React.useState([
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

  const handleSelectList = (listId) => {
    navigation.navigate('TaskScreen', { listId }); // Navigate to TaskScreen with listId
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={lists}
        keyExtractor={list => list.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listButton}
            onPress={() => handleSelectList(item.id)}
          >
            <Text style={styles.listButtonText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.deleteListButton}
              onPress={() => deleteList(item.id)} // Implement deleteList function
            >
              <Icon name="delete" size={24} color="#FF6347" />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
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
  listButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listButtonText: {
    flex: 1,
    fontSize: 18,
    color: '#333',
  },
  deleteListButton: {
    marginLeft: 10,
  },
});
