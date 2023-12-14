import React, { useState, useEffect } from 'react';
import { FlatList, Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { IconButton } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Fallback from '../components/Fallback';

const TodoScreen = ({ navigation }) => {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editedTodo, setEditedTodo] = useState(null);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [showAllTasks, setShowAllTasks] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  // Estado para mensagens do chat
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    const updateCurrentDate = () => {
      setCurrentDate(new Date().toISOString().split('T')[0]);
    };
    updateCurrentDate();
  }, []);

  useEffect(() => {
    const loadAsyncData = async () => {
      try {
        const savedCompletedTasks = await AsyncStorage.getItem('completedTasks');
        if (savedCompletedTasks) {
          setCompletedTasks(JSON.parse(savedCompletedTasks));
        }
      } catch (error) {
        console.error('Error loading data from AsyncStorage:', error.message);
      }
    };

    loadAsyncData();
  }, []);

  useEffect(() => {
    const saveCompletedTasks = async () => {
      try {
        await AsyncStorage.setItem('completedTasks', JSON.stringify(completedTasks));
      } catch (error) {
        console.error('Error saving completedTasks to AsyncStorage:', error.message);
      }
    };

    saveCompletedTasks();
  }, [completedTasks]);

  const handleAddTodo = () => {
    if (todo.trim() === "") {
      return alert("Digite sua tarefa para adicioná-la");
    }
    setTodoList([...todoList, { id: Date.now().toString(), title: todo, completed: false }]);
    setTodo("");
  };

  const handleDeleteTodo = (id) => {
    Alert.alert(
      'Excluir Tarefa',
      'Tem certeza de que deseja excluir esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            const updatedTodoList = todoList.filter((todo) => todo.id !== id);
            setTodoList(updatedTodoList);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditTodo = (todo) => {
    Alert.alert(
      'Editar Tarefa',
      'Tem certeza de que deseja editar esta tarefa?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Editar',
          onPress: () => {
            setEditedTodo(todo);
            setTodo(todo.title);
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleUpdateTodo = () => {
    const updatedTodos = todoList.map((item) => {
      if (item.id === editedTodo.id) {
        return { ...item, title: todo };
      }
      return item;
    });
    setTodoList(updatedTodos);
    setEditedTodo(null);
    setTodo("");
  };

  const handleCompleteTodo = async (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id ? { ...todo, completed: true } : todo
    );

    const completedTask = updatedTodoList.find((todo) => todo.id === id);
    setCompletedTasks([...completedTasks, completedTask]);
    setTodoList(updatedTodoList.filter((todo) => todo.id !== id));

    try {
      await AsyncStorage.setItem('completedTasks', JSON.stringify([...completedTasks, completedTask]));
    } catch (error) {
      console.error('Error saving completedTasks to AsyncStorage:', error.message);
    }
  };

  const handleShowAllTasks = () => {
    setShowAllTasks(true);
  };

  const sendMessage = () => {
    if (newMessage.trim() === "") {
      return;
    }

    const newMessageObj = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessageObj]);
    setNewMessage("");
  };

  const renderTodo = ({ item, index }) => {
    if (!showAllTasks && item.completed) {
      return null;
    }
    return (
      <View
        style={{
          backgroundColor: "#1e90ff",
          borderRadius: 6,
          paddingHorizontal: 6,
          paddingVertical: 12,
          marginBottom: 12,
          flexDirection: "row",
          alignItems: "center",
          shadowColor: "#000",
          shadowOffset: { width: 13, height: 5 },
          shadowOpacity: 1,
          shadowRadius: 2,
          elevation: 35,
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, fontWeight: "900", flex: 1 }}>
          {item.title}
        </Text>
        <IconButton
          style={{ borderWidth: 1, borderColor: "#fff" }}
          icon="pencil"
          iconColor="#fff"
          onPress={() => handleEditTodo(item)}
        />
        <IconButton
          style={{ borderWidth: 1, borderColor: "#fff" }}
          icon="trash-can"
          iconColor="#fff"
          onPress={() => handleDeleteTodo(item.id)}
        />
        <IconButton
          style={{ borderWidth: 1, borderColor: "#fff" }}
          icon="check"
          iconColor="#fff"
          onPress={() => handleCompleteTodo(item.id)}
        />
      </View>
    );
  };

  return (
    <View style={{ marginHorizontal: 20, marginVertical: 50 }}>
      <TextInput
        style={{
          borderWidth: 2,
          borderColor: "#1e90ff",
          borderRadius: 10,
          paddingVertical: 12,
          paddingHorizontal: 18,
        }}
        placeholder='Adicionar Tarefas'
        value={todo}
        onChangeText={(userText) => setTodo(userText)}
      ></TextInput>
      {editedTodo ? (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 34,
            alignItems: "center"
          }}
          onPress={() => handleUpdateTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Salvar</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: "#000",
            borderRadius: 6,
            paddingVertical: 8,
            marginVertical: 34,
            alignItems: "center"
          }}
          onPress={() => handleAddTodo()}
        >
          <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Adicionar</Text>
        </TouchableOpacity>
      )}

      {/* Botão para navegar para a tela de chat */}
      <TouchableOpacity
        style={{
          backgroundColor: "#000",
          borderRadius: 6,
          paddingVertical: 8,
          marginVertical: 34,
          alignItems: "center",
        }}
        onPress={() => navigation.navigate('Abrir Chat!')}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20 }}>Ir para o Chat</Text>
      </TouchableOpacity>

      {/* Renderização da Lista de Tarefas */}
      <FlatList
        data={todoList.filter((item) => !item.completed)}
        renderItem={renderTodo}
      />

      {/* Renderização das tarefas concluídas */}
      {showAllTasks && (
        <>
          <Text style={{ fontSize: 24, fontWeight: 'bold', marginVertical: 10 }}>
            Tarefas Concluídas
          </Text>
          <FlatList data={completedTasks} renderItem={renderTodo} />
        </>
      )}

      {/* Renderização do Fallback quando não há tarefas */}
      {todoList.length <= 0 && !showAllTasks && <Fallback></Fallback>}

      {/* Botão para exibir todas as tarefas do dia */}
      <TouchableOpacity
        style={{
          backgroundColor: "#099c3a",
          borderRadius: 50,
          paddingVertical: 10,
          marginVertical: 10,
          alignItems: "center",
        }}
        onPress={() => {
          handleShowAllTasks();
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 20, textAlign: "center" }}>
          Mostrar Todas as Tarefas do Dia
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default TodoScreen;
