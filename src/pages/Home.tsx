import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { TasksList } from '../components/TasksList';
import { Task, TaskEditedArgs } from '../components/TaskItem';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    let titleEqual = tasks.find(element => element.title == newTaskTitle)
    if (titleEqual){
      Alert.alert(
        "Task já cadastrada",
        "Você não pode cadastrar uma task com o mesmo nome.",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
      );
    } else {
      setTasks([...tasks, {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }])
    }
  }

  function handleToggleTaskDone(id: number) {
    let newTasks = tasks.map((task) => {
      if(id === task.id)
        return {
          ...task,
          done: !task.done
        }
      return task
    });
    setTasks(newTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => {
          let newTasks = tasks.filter(item => item.id !== id);
          setTasks(newTasks);
        }}
      ]
    );
  }

  function handleEditTask({ taskId, taskNewTitle }: TaskEditedArgs){
    let newTasks = tasks.map((task) => {
      if(taskId === task.id)
        return {
          ...task,
          title: taskNewTitle
        }
      return task
    });
    setTasks(newTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})