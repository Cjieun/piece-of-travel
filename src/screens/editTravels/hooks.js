import {useState} from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useEditTravel() {
  const route = useRoute();
  const navigation = useNavigation();
  const {travel} = route.params;

  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [startDate, setStartDate] = useState(new Date(travel.beginDate));
  const [endDate, setEndDate] = useState(new Date(travel.endDate));
  const [title, setTitle] = useState(travel.title);
  const [place, setPlace] = useState(travel.place);

  const handleDateConfirm = selectedDate => {
    if (selectedDate) {
      if (currentPicker === 'start') {
        setStartDate(selectedDate);
        if (selectedDate > endDate) {
          setEndDate(selectedDate);
        }
      } else if (currentPicker === 'end') {
        setEndDate(selectedDate);
      }
    }
    setShowPicker(false);
  };

  const openPicker = pickerType => {
    setCurrentPicker(pickerType);
    setShowPicker(true);
  };

  const handleUpdate = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (!storedTravels) return;

      const parsedTravels = JSON.parse(storedTravels);

      const travelIndex = parsedTravels.findIndex(t => t.id === travel.id);
      if (travelIndex === -1) return;

      parsedTravels[travelIndex] = {
        ...parsedTravels[travelIndex],
        title,
        beginDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        place,
      };

      await AsyncStorage.setItem('travels', JSON.stringify(parsedTravels));

      navigation.goBack();
    } catch (error) {
      console.error('여행 정보 수정 실패:', error);
    }
  };

  return {
    showPicker,
    title,
    setTitle,
    place,
    setPlace,
    startDate,
    endDate,
    handleDateConfirm,
    currentPicker,
    openPicker,
    handleUpdate,
  };
}
