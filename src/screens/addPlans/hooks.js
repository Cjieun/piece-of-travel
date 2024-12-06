import {useNavigation, useRoute} from '@react-navigation/native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAddPlans() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, selectedDay} = route.params;

  const [title, setTitle] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [time, setTime] = useState(new Date());
  const [place, setPlace] = useState('');
  const [memo, setMemo] = useState('');
  const [showTimePicker, setShowTimePicker] = useState(false);

  const formatTime = date => {
    const options = {hour: 'numeric', minute: 'numeric', hour12: true};
    return new Intl.DateTimeFormat('ko-KR', options).format(date);
  };

  const handleTimeChange = (event, selectedTime) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setTime(selectedTime);
      setInputTime(formatTime(selectedTime));
    }
  };

  const handleSubmit = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (!storedTravels) return;

      const parsedTravels = JSON.parse(storedTravels);

      const travelIndex = parsedTravels.findIndex(travel => travel.id === id);
      if (travelIndex === -1) return;

      const selectedTravel = parsedTravels[travelIndex];

      if (!selectedTravel.plans) {
        selectedTravel.plans = [];
      }

      const dayIndex = selectedTravel.plans.findIndex(
        plan => plan.day === selectedDay,
      );

      const lastId = 0;

      if (dayIndex !== -1) {
        const currentDayItems = selectedTravel.plans[dayIndex].items || [];
        lastId = currentDayItems.reduce(
          (maxId, item) => (item.id > maxId ? item.id : maxId),
          0,
        );
      }

      const newItem = {
        id: lastId + 1,
        time: inputTime,
        title,
        place,
        mapPlace: '',
        memo,
        isDone: false,
        puzzles: {},
        AI: false,
        feedback: '',
      };

      if (dayIndex !== -1) {
        selectedTravel.plans[dayIndex].items.push(newItem);
      } else {
        const newDayPlan = {
          day: selectedDay,
          items: [newItem],
        };
        selectedTravel.plans.push(newDayPlan);
      }

      parsedTravels[travelIndex] = selectedTravel;
      await AsyncStorage.setItem('travels', JSON.stringify(parsedTravels));

      navigation.goBack();

      console.log('일정 추가 완료:', parsedTravels);
    } catch (error) {
      console.error('일정 추가 실패:', error);
    }
  };

  return {
    title,
    setTitle,
    inputTime,
    setInputTime,
    time,
    place,
    setPlace,
    memo,
    setMemo,
    showTimePicker,
    setShowTimePicker,
    handleTimeChange,
    handleSubmit,
  };
}
