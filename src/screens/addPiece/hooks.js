import {useState, useEffect} from 'react';
import {Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from '../../api/uploadImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

export const useAddPiece = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const {travelId, day, itemId} = route.params;
  const [images, setImages] = useState([null, null, null]);
  const [uploadedUrls, setUploadedUrls] = useState([null, null, null]);
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

  const handleImageSelect = async index => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 접근 권한을 허용해주세요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);

      const uploadedUrl = await uploadImage(result.assets[0].uri);
      if (uploadedUrl) {
        const newUrls = [...uploadedUrls];
        newUrls[index] = uploadedUrl;
        setUploadedUrls(newUrls);
      }
    }
  };

  const handleSubmit = async () => {
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

      selectedTravel.plans[dayIndex].items[itemIndex].puzzles = {
        images: validUrls,
        content: content.trim(),
      };

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
    images,
    uploadedUrls,
    content,
    setContent,
    handleImageSelect,
    handleSubmit,
  };
};
