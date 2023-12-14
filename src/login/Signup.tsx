import React, { useState } from 'react';
import { View, Text, Image, ScrollView } from 'react-native';
import { Button, Input } from '@rneui/base';
import ImagePicker from 'react-native-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './Styles';

const Signup = ({ navigation }) => {
  const [profileImage, setProfileImage] = useState(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = () => {
    if (password !== confirmPassword) {
      console.log('As senhas não correspondem');
      return;
    }

    navigation.navigate('Login');
  };

  const handleChooseImage = () => {
    const options = {
      title: 'Escolha uma foto de perfil',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Escolha de imagem cancelada');
      } else if (response.error) {
        console.log('Erro ao escolher imagem:', response.error);
      } else {
        setProfileImage(response.uri);
      }
    });
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
      <Text style={styles.text}>Criar Conta</Text>

      <View style={styles.caixaDeEmail}>
        <Text style={styles.texto}>Nome de Usuário:</Text>
        <Input style={styles.EmaileSenha} placeholder="Nome de Usuário" />
      </View>

      <View style={styles.caixaDeEmail}>
        <Text style={styles.texto}>E-MAIL:</Text>
        <Input style={styles.EmaileSenha} placeholder="E-mail" />
      </View>

      <View style={styles.caixaDaSenha}>
        <Text style={styles.texto}>SENHA:</Text>
        <Input
          style={styles.EmaileSenha}
          placeholder="Senha"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View style={styles.caixaDaSenha}>
        <Text style={styles.texto}>CONFIRME SUA SENHA:</Text>
        <Input
          style={styles.EmaileSenha}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => setConfirmPassword(text)}
        />
      </View>

      <View style={styles.caixaDeFoto}>
        <Text style={styles.texto}>Foto de Perfil:</Text>
        {profileImage && (
          <Image source={{ uri: profileImage }} style={styles.fotoDePerfil} />
        )}
        <Button style={styles.escolherFoto} onPress={handleChooseImage}>
          Escolher Foto
        </Button>
      </View>

      <Button style={styles.signup} onPress={handleSignup}>
        Criar Conta
      </Button>
    </KeyboardAwareScrollView>
  );
};

export default Signup;
