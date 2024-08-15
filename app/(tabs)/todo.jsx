import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { Swipeable } from 'react-native-gesture-handler';

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);

  const addTask = () => {
    if (task.trim()) {
      if (editingTaskId) {
        setTasks(
          tasks.map((t) =>
            t.id === editingTaskId ? { ...t, text: task } : t
          )
        );
        setEditingTaskId(null);
      } else {
        setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      }
      setTask('');
    }
  };

  const editTask = (task) => {
    setTask(task.text);
    setEditingTaskId(task.id);
  };

  const deleteTask = (taskId) => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => setTasks(tasks.filter((task) => task.id !== taskId)),
        },
      ],
      { cancelable: true }
    );
  };

  const renderLeftActions = (task) => (
    <TouchableOpacity onPress={() => editTask(task)} style={styles.leftAction}>
      <Ionicons name="create-outline" size={28} color="#FFF" />
      <Text style={styles.actionText}>Edit</Text>
    </TouchableOpacity>
  );

  const renderRightActions = (taskId) => (
    <TouchableOpacity onPress={() => deleteTask(taskId)} style={styles.rightAction}>
      <MaterialIcons name="delete-outline" size={28} color="#FFF" />
      <Text style={styles.actionText}>Delete</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      //colors={['#1a1a2e', '#16213e']}
      colors={['#151515', '#151515']}
      style={styles.container}
    >
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          placeholderTextColor="#bbb"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Ionicons
            name={editingTaskId ? "checkmark-circle-outline" : "add-circle-outline"}
            size={28}
            color="#FFF"
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <Swipeable
            renderLeftActions={() => renderLeftActions(item)}
            renderRightActions={() => renderRightActions(item.id)}
          >
            <View style={styles.taskContainer}>
              <Text style={styles.taskText}>{item.text}</Text>
            </View>
          </Swipeable>
        )}
        keyExtractor={(item) => item.id}
        style={styles.taskList}
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFF',
    marginBottom: 20,
    marginTop: 60,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#FFF',
    fontFamily: 'outfit',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#969696',
    padding: 10,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  taskContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskText: {
    color: '#FFF',
    fontFamily: 'outfit',
    fontSize: 18,
  },
  actions: {
    flexDirection: 'row',
  },
  taskList: {
    marginTop: 10,
  },
  leftAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  rightAction: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF6F61',
    borderRadius: 15,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  actionText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'outfit',
    marginTop: 5,
  },
});

export default ToDoList;

