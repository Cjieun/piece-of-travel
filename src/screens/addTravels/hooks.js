import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const useAddTravels = () => {
  const navigation = useNavigation();

  const saveTravel = async ({title, place, startDate, endDate}) => {
    if (!title || !place) {
      Alert.alert('Error', '여행 이름과 여행지를 입력하세요.');
      return;
    }

    const pieces =
      Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    try {
      // 저장된 travels 데이터 가져오기
      const storedTravels = await AsyncStorage.getItem('travels');
      const travels = storedTravels ? JSON.parse(storedTravels) : [];

      const lastId = travels.length > 0 ? travels[travels.length - 1].id : 0;

      const newTravel = {
        id: lastId + 1,
        title,
        place,
        beginDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        pieces,
      };

      travels.push(newTravel);
      await AsyncStorage.setItem('travels', JSON.stringify(travels));

      console.log('Travel saved successfully:', travels);

      navigation.navigate('/');
    } catch (error) {
      console.error('Failed to save travel:', error);
      Alert.alert('Error', '여행 데이터를 저장하는 데 문제가 발생했습니다.');
    }
  };

  return {saveTravel};
};
