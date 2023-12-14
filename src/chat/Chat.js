import React, { Fragment, useEffect, useState, useRef } from 'react';
import { ScrollView, TextInput, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import ChatStyles from './ChatStyles';
import storageService from './StorageService';
import { io } from 'socket.io-client';

const Chat = () => {
  const [text, setText] = useState('');
  const [chat, setChat] = useState({ messages: [] });
  const [userData, setUserData] = useState({ name: '' });

  const scrollViewRef = useRef();

  useEffect(() => {
    // Use uma função de atualização do estado para garantir que as alterações sejam refletidas
    const updateChat = (newMessage) => {
      setChat((prevChat) => ({ messages: [...prevChat.messages, newMessage] }));
      // Scroll para a nova mensagem
      scrollViewRef.current.scrollToEnd({ animated: true });
    };

    storageService.getItem('userData').then((storedUserData) => {
      const initialUserData = storedUserData || { name: '' };
      setUserData(initialUserData);

      // Use a referência de socket no escopo atual
      const socket = io('http://localhost:3000');

      socket.on('chat', (response) => {
        updateChat(response);
      });
    });
  }, []); // Certifique-se de passar uma dependência vazia para executar o efeito apenas uma vez

  const sendMessage = () => {
    if (text.trim() !== '') {
      const newMessage = {
        content: text,
        sentBy: userData.name || 'Usuário Desconhecido',
        date: new Date(),
      };

      // Use a referência de socket no escopo atual
      const socket = io('http://localhost:3000');
      
      socket.emit('chat', newMessage);

      // Limpe o campo de texto após o envio
      setText('');
      // Atualize o chat localmente
      setChat((prevChat) => ({ messages: [...prevChat.messages, newMessage] }));
      // Scroll para a nova mensagem
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <Fragment>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={ChatStyles.scrollViewContainer}
        onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
      >
        {/* Renderizar mensagens aqui */}
        {chat.messages.map((message, index) => (
          <View key={index}>
            <Text>{message.sentBy}: {message.content}</Text>
          </View>
        ))}
      </ScrollView>
      <SafeAreaView>
        <View style={ChatStyles.messageTextInputContainer}>
          <TextInput
            style={ChatStyles.messageTextInput}
            placeholder="Digite sua mensagem..."
            placeholderTextColor="#888"
            value={text}
            multiline
            onChangeText={(message) => setText(message)}
          />
          <TouchableOpacity
            style={ChatStyles.sendButton}
            disabled={!text}
            onPress={() => sendMessage()}
          >
            <Text style={{ color: '#fff' }}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Fragment>
  );
};

export default Chat;
