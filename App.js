import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import TodoList from './components/TodoList';

export default function App() {
  return (
    <View style={styles.container}>
      <TodoList />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
