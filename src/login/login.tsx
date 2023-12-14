// Login.tsx
import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '@rneui/themed';
import { Input } from '@rneui/base';
import styles from './Styles';

const Login = ({ navigation }) => {
  const handleLogin = () => {
    // Aqui você pode adicionar lógica de autenticação, por enquanto, vamos apenas navegar para a tela TodoScreen
    navigation.navigate('Todo');
  };

  const handleSignup = () => {
    navigation.navigate('Signup');
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>TODOLIST</Text>

      <View style={styles.caixaDeEmail}>
        <Text style={styles.texto}>E-MAIL:</Text>
        <Input style={styles.EmaileSenha} placeholder="e-mail" />
      </View>

      <View style={styles.caixaDaSenha}>
        <Text style={styles.texto}>SENHA:</Text>
        <Input style={styles.EmaileSenha} placeholder="senha" secureTextEntry />
      </View>

      <View style={styles.CriarEsqueci}>
        <Text style={styles.link} onPress={handleSignup}>Criar conta</Text>
        <Text style={styles.link} onPress={handleForgotPassword}>Esqueceu sua senha?</Text>
      </View>
      
      <Button style={styles.login} onPress={handleLogin}>
        login
      </Button>
    </View>
  );
};

export default Login;
