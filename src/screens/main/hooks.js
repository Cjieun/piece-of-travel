import {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useMain = id => {
  const navigation = useNavigation();

  const [travels, setTravels] = useState([]);

  const handlePress = () => {
    navigation.navigate('/addTravels');
  };

  const fetchTravels = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (storedTravels) {
        setTravels(JSON.parse(storedTravels));
      }
    } catch (error) {
      console.error('여행 목록을 불러오는데 실패했습니다.', error);
    }
  };

  useEffect(() => {
    fetchTravels();
  }, []);

  return {handlePress, travels};
};
