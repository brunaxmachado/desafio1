import React, {useState, useRef, useEffect} from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png'
import editIcon from '../assets/icons/edit/penEdit.png'

export interface Task {
    id: number;
    title: string;
    done: boolean;
}

export type TaskEditedArgs = {
  taskId: number;
  taskNewTitle: string;
}

interface TaskItemProps {
    task: Task,
    index: number,
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, taskNewTitle}: TaskEditedArgs) => void;
}

export function TaskItem({task, index, toggleTaskDone, removeTask, editTask}: TaskItemProps){
    const [editing, setEditing] = useState(false)
    const [title, setTitle] = useState(task.title)

    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing(){
        setEditing(true);
    }

    function handleCancelEditing(){
        setTitle(task.title)
        setEditing(false)
    }

    function handleSubmitEditing(){
        editTask({taskId: task.id, taskNewTitle: title})
        setEditing(false)
    }

    useEffect(() => {
        if (textInputRef.current) {
            if (editing)
                textInputRef.current.focus();
            else
                textInputRef.current.blur();
        }
    }, [editing])

    return(
        <>
            <View>
              <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(task.id)}
              >
                <View 
                  testID={`marker-${index}`}
                  style={task.done ? styles.taskMarkerDone : styles.taskMarker}
                >
                  { task.done && (
                    <Icon 
                      name="check"
                      size={12}
                      color="#FFF"
                    />
                  )}
                </View>
                <TextInput 
                    value={title} 
                    onChangeText={setTitle}
                    editable={editing}
                    onSubmitEditing={handleSubmitEditing}
                    style={task.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
              </TouchableOpacity>
            </View>
            <View style={ styles.iconsContainer } >
                { editing ? (
                    <TouchableOpacity
                    onPress={handleCancelEditing}
                    >
                    <Icon name="x" size={24} color="#b2b2b2" />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                    onPress={handleStartEditing}
                    >
                    <Image source={editIcon} />
                    </TouchableOpacity>
                ) }

                <View 
                    style={ styles.iconsDivider }
                />

                <TouchableOpacity
                    disabled={editing}
                    onPress={() => removeTask(task.id)}
                >
                    <Image source={trashIcon} style={{ opacity: editing ? 0.2 : 1 }} />
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    iconsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 15
    },
    iconsDivider: {
        width: 1,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 12,
    },
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    }
})