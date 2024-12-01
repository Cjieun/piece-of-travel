import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const useAddTravels = () => {
  const navigation = useNavigation();

  // 여행 데이터 저장
  const saveTravel = async ({title, place, startDate, endDate}) => {
    if (!title || !place) {
      Alert.alert('Error', '여행 이름과 여행지를 입력하세요.');
      return;
    }

    // 여행 기간 계산 (밀리초 차이 -> 일수로 변환)
    const pieces =
      Math.round((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

    try {
      // 저장된 travels 데이터 가져오기
      const storedTravels = await AsyncStorage.getItem('travels');
      const travels = storedTravels ? JSON.parse(storedTravels) : [];

      // 마지막 ID 가져오기
      const lastId = travels.length > 0 ? travels[travels.length - 1].id : 0;

      // 새로운 여행 데이터 생성
      const newTravel = {
        id: lastId + 1, // ID를 순차적으로 증가
        title,
        place,
        beginDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        pieces,
      };

      // travels 배열에 추가
      travels.push(newTravel);
      await AsyncStorage.setItem('travels', JSON.stringify(travels));

      console.log('Travel saved successfully:', travels);

      // Main 화면으로 이동
      navigation.navigate('/');
    } catch (error) {
      console.error('Failed to save travel:', error);
      Alert.alert('Error', '여행 데이터를 저장하는 데 문제가 발생했습니다.');
    }
  };

  return {saveTravel};
};
