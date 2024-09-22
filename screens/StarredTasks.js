import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const StarredTasks = ({ route }) => {
    const { starredTasks = [] } = route.params || {}; // Provide default value if no params
  
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Favorite Tasks</Text>
        {starredTasks.length === 0 ? (
          <Text style={styles.noTasks}>No favorite tasks found.</Text>
        ) : (
          <FlatList
            data={starredTasks}
            keyExtractor={(item) => item.id.toString()} // Ensure each item has a unique key
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.text}</Text>
              </View>
            )}
          />
        )}
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F4F4F4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  noTasks: {
    fontSize: 18,
    color: '#555',
  },
  taskItem: {
    padding: 15,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  taskText: {
    fontSize: 16,
  },
});

export default StarredTasks;
