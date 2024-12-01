import React from 'react';
import {View, Button, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  // 로컬 데이터 삭제 함수
  const clearLocalStorage = async () => {
    try {
      await AsyncStorage.clear(); // AsyncStorage 데이터 초기화
      Alert.alert('Success', '모든 로컬 데이터가 초기화되었습니다.');
      console.log('AsyncStorage cleared successfully.');
    } catch (error) {
      console.error('Failed to clear AsyncStorage:', error);
      Alert.alert('Error', '로컬 데이터를 초기화하는 데 문제가 발생했습니다.');
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Clear All Data" onPress={clearLocalStorage} />
    </View>
  );
}
