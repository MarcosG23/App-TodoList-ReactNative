// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import TodoScreen from './src/screens/TodoScreen';
import Login from './src/login/login';
import Signup from './src/login/Signup';
import Chat from './src/chat/Chat';
import ForgotPassword from './src/login/ForgotPassword';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Todo" component={TodoScreen} />
        <Stack.Screen name="Abrir Chat!" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
