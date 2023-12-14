import AsyncStorage from '@react-native-async-storage/async-storage';

class StorageService {
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Erro ao obter item do armazenamento:', error);
      return null;
    }
  }

  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Erro ao definir item no armazenamento:', error);
    }
  }
}

const storageService = new StorageService(); // Criando uma instância da classe

export default storageService;