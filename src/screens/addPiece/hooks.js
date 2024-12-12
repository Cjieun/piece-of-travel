import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';
import {useSelectImage} from '../../modules/useSelectImage';

export const useAddPiece = uploadedUrls => {
  const route = useRoute();
  const navigation = useNavigation();
  const {travelId, day, itemId} = route.params;
  const [content, setContent] = useState('');
  const [travelData, setTravelData] = useState([]);

  useEffect(() => {
    const loadTravelData = async () => {
      try {
        const storedTravels = await AsyncStorage.getItem('travels');
        if (storedTravels) {
          const parsedTravels = JSON.parse(storedTravels);
          setTravelData(parsedTravels);
        }
      } catch {
        Alert.alert('오류', '여행 데이터를 불러오는 중 문제가 발생했습니다.');
      }
    };
    loadTravelData();
  }, []);

  const handleSubmit = async () => {
    console.log(uploadedUrls);
    const validUrls = uploadedUrls.filter(Boolean);
    if (validUrls.length < 1 || !content.trim()) {
      Alert.alert(
        '입력 필요',
        '최소 1개의 이미지를 업로드하고 내용을 입력하세요.',
      );
      return;
    }

    try {
      const travelIndex = travelData.findIndex(
        travel => Number(travel.id) === Number(travelId),
      );
      if (travelIndex === -1) {
        Alert.alert('오류', '해당 여행을 찾을 수 없습니다.');
        return;
      }

      const selectedTravel = travelData[travelIndex];
      const dayIndex = selectedTravel.plans.findIndex(plan => plan.day === day);
      if (dayIndex === -1) {
        Alert.alert('오류', '해당 날짜의 계획을 찾을 수 없습니다.');
        return;
      }

      const itemIndex = selectedTravel.plans[dayIndex].items.findIndex(
        item => item.id === itemId,
      );
      if (itemIndex === -1) {
        Alert.alert('오류', '해당 아이템을 찾을 수 없습니다.');
        return;
      }

      selectedTravel.plans[dayIndex].items[itemIndex].puzzle = {
        images: validUrls,
        content: content.trim(),
      };

      if (!selectedTravel.pieces) {
        selectedTravel.pieces = 1;
      } else {
        selectedTravel.pieces += 1;
      }

      const updatedTravelData = [...travelData];
      updatedTravelData[travelIndex] = selectedTravel;
      await AsyncStorage.setItem('travels', JSON.stringify(updatedTravelData));

      Alert.alert('작성 완료', 'Puzzle이 성공적으로 저장되었습니다.');
      navigation.goBack();
    } catch {
      console.error('Puzzle 저장 실패:', error);
      Alert.alert('오류', 'Puzzle 데이터를 저장하는 중 문제가 발생했습니다.');
    }
  };

  return {
    content,
    setContent,
    handleSubmit,
  };
};
