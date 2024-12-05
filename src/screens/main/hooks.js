import {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMain = id => {
  const navigation = useNavigation();

  const [travels, setTravels] = useState([]);

  const fetchTravels = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (storedTravels) {
        setTravels(JSON.parse(storedTravels));
      }
    } catch (error) {
      console.error('여행 일정 조회 실패', error);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  const handlePress = () => {
    navigation.navigate('addTravels', {id});
  };

  return {handlePress, travels, setTravels};
};
