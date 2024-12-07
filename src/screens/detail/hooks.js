import {useState, useCallback} from 'react';
import {calculateDays} from '../../modules/useDate';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export function useDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {id} = route.params;

  const [travel, setTravel] = useState(null);
  const [selectedPlans, setSelectedPlans] = useState([]);
  const [showKebab, setShowKebab] = useState(false);
  const [selectedDay, setSelectedDay] = useState(1);

  const fetchTravel = async () => {
    try {
      const storedTravels = await AsyncStorage.getItem('travels');
      if (storedTravels) {
        const parsedTravels = JSON.parse(storedTravels);
        const selectedTravel = parsedTravels.find(travel => travel.id === id);
        setTravel(selectedTravel);

        if (selectedTravel && selectedTravel.plans) {
          const dayPlans = selectedTravel.plans.find(
            plan => plan.day === selectedDay,
          );
          setSelectedPlans(dayPlans?.items || []);
        }
        console.log(selectedPlans);
      }
    } catch (error) {
      console.error('여행 정보 조회 실패:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTravel();
    }, [id, selectedDay]),
  );

  const toggleKebab = () => {
    setShowKebab(prev => !prev);
  };

  const title = travel?.title || '';
  const beginDate = travel?.beginDate || '';
  const endDate = travel?.endDate || '';

  const daysCount =
    beginDate && endDate ? calculateDays(beginDate, endDate) : 0;

  const dayLabels = Array.from({length: daysCount}, (_, i) => i + 1);

  const getSelectedDate = () => {
    const date = new Date(beginDate);
    date.setDate(date.getDate() + (selectedDay - 1));
    return date.toISOString().split('T')[0].replace(/-/g, '.');
  };

  const handleAddPlans = () => {
    navigation.navigate('addPlans', {id, selectedDay});
  };

  const handlePlansDone = async () => {
    Alert.alert(
      '완료 확인',
      '모든 일정을 완료 상태로 변경하시겠습니까?',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '완료',
          onPress: async () => {
            try {
              const storedTravels = await AsyncStorage.getItem('travels');
              if (!storedTravels) return;

              const parsedTravels = JSON.parse(storedTravels);

              const travelIndex = parsedTravels.findIndex(
                travel => travel.id === id,
              );
              if (travelIndex === -1) return;

              const selectedTravel = parsedTravels[travelIndex];
              const dayIndex = selectedTravel.plans.findIndex(
                plan => plan.day === selectedDay,
              );

              if (dayIndex !== -1) {
                selectedTravel.plans[dayIndex].items = selectedTravel.plans[
                  dayIndex
                ].items.map(item => ({...item, isDone: true}));

                parsedTravels[travelIndex] = selectedTravel;
                await AsyncStorage.setItem(
                  'travels',
                  JSON.stringify(parsedTravels),
                );

                fetchTravel();
              }
            } catch (error) {
              console.log('일정 완료 실패: ', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const allPlansDone = selectedPlans.every(plan => plan.isDone);

  return {
    showKebab,
    toggleKebab,
    dayLabels,
    selectedDay,
    setSelectedDay,
    travel,
    title,
    getSelectedDate,
    selectedPlans,
    handleAddPlans,
    fetchTravel,
    handlePlansDone,
    allPlansDone,
  };
}
