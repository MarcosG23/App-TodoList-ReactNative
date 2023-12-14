// ForgotPassword.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Button, Input } from '@rneui/base';
import styles from './Styles';

const ForgotPassword = ({ navigation }) => {
  const handleForgotPassword = () => {
    // Adicione a lógica para enviar e-mail de recuperação de senha aqui

    // Após o envio do e-mail de recuperação, navegue de volta para a tela de login
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esqueceu sua Senha?</Text>

      <View style={styles.caixaDeEmail}>
        <Text style={styles.texto}>E-MAIL:</Text>
        <Input style={styles.EmaileSenha} placeholder="E-mail" />
      </View>

      <Button style={styles.forgotPassword} onPress={handleForgotPassword}>
        Enviar E-mail de Recuperação
      </Button>
    </View>
  );
};

export default ForgotPassword;
