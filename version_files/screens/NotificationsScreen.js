// screens/NotificationsScreen.js

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function NotificationsScreen() {
  const [upcomingTasks, setUpcomingTasks] = useState([]);

  useEffect(() => {
    const loadUpcomingTasks = async () => {
      try {
        const storedLists = await AsyncStorage.getItem('lists');
        const lists = storedLists ? JSON.parse(storedLists) : [];
        const upcoming = lists.flatMap(list => list.tasks)
          .filter(task => new Date(task.dueDate) > new Date());
        setUpcomingTasks(upcoming);
      } catch (error) {
        Alert.alert('Error', 'Failed to load upcoming tasks.');
      }
    };
    loadUpcomingTasks();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={upcomingTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskText}>{item.text} - Due: {new Date(item.dueDate).toDateString()}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No upcoming tasks</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  taskItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  taskText: {
    fontSize: 16,
  },
});