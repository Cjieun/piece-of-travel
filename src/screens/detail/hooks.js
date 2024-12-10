import {useState, useCallback, useEffect} from 'react';
import {calculateDays, getSelectedDate} from '../../modules/useDate';
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';
import {API_URL} from '@env';

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

  const selectedDate = travel ? getSelectedDate(beginDate, selectedDay) : '';

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

  const handleUpdateTravel = () => {
    navigation.navigate('editTravels', {travel});
  };

  const handleDeleteTravel = async () => {
    Alert.alert(
      '삭제 확인',
      '이 여행을 삭제하시겠습니까? 삭제 후 복구할 수 없습니다.',
      [
        {
          text: '취소',
          style: 'cancel',
        },
        {
          text: '삭제',
          onPress: async () => {
            try {
              const storedTravels = await AsyncStorage.getItem('travels');
              if (!storedTravels) return;

              const parsedTravels = JSON.parse(storedTravels);

              const updatedTravels = parsedTravels.filter(
                travelItem => travelItem.id !== travel.id,
              );

              await AsyncStorage.setItem(
                'travels',
                JSON.stringify(updatedTravels),
              );

              navigation.navigate('main');
            } catch (error) {
              console.error('여행 삭제 실패:', error);
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  const fetchAIData = async () => {
    const itineraryData = {
      place: travel.place,
      items: selectedPlans.map(plan => ({
        ...plan,
      })),
    };

    try {
      const response = await fetch(`${API_URL}/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itineraryData),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const responseData = await response.json();
      const feedbackData = JSON.parse(responseData.msg);
      console.log('응답 데이터:', feedbackData);

      navigation.navigate('aiDetail', {
        selectedTravel: travel,
        selectedDay,
        feedbackData,
      });
    } catch (error) {
      console.error('데이터 전송 실패:', error);
      throw error;
    }
  };

  const handleAI = () => {
    fetchAIData();
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
    selectedDate,
    selectedPlans,
    handleAddPlans,
    fetchTravel,
    handlePlansDone,
    allPlansDone,
    handleUpdateTravel,
    handleDeleteTravel,
    handleAI,
  };
}

export function useAIDetail() {
  const navigation = useNavigation();
  const route = useRoute();
  const {selectedTravel, selectedDay, feedbackData} = route.params;

  const [AIPlans, setAIPlans] = useState([]);

  useEffect(() => {
    if (feedbackData) {
      setAIPlans(feedbackData?.plans || []);
    }
    console.log(AIPlans);
  }, []);

  const deleteAIPlan = time => {
    setAIPlans(prevPlans => prevPlans.filter(plan => plan.time !== time));
  };

  const selectedDate = selectedTravel
    ? getSelectedDate(selectedTravel.beginDate, selectedDay)
    : '';

  const handleGoBack = () => {
    Alert.alert(
      '뒤로 가기 확인',
      'AI 피드백이 적용되지 않으며 다시 받아볼 수 없습니다. 계속 진행하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '확인',
          onPress: () => {
            navigation.goBack();
          },
        },
      ],
      {cancelable: true},
    );
  };

  const handleSaveFeedback = async () => {
    Alert.alert(
      'AI 피드백 적용',
      'AI 피드백이 기존 일정에 덮어씌워집니다. 진행하시겠습니까?',
      [
        {text: '취소', style: 'cancel'},
        {
          text: '적용',
          onPress: async () => {
            try {
              const storedTravels = await AsyncStorage.getItem('travels');
              if (!storedTravels) return;

              const parsedTravels = JSON.parse(storedTravels);

              const travelIndex = parsedTravels.findIndex(
                travel => travel.id === selectedTravel.id,
              );

              if (travelIndex === -1) return;

              const updatedTravel = {...parsedTravels[travelIndex]};
              const dayIndex = updatedTravel.plans.findIndex(
                plan => plan.day === selectedDay,
              );

              const updatedAIPlans = AIPlans.map(plan => ({
                ...plan,
                AI: false,
                feedback: '',
              }));

              if (dayIndex !== -1) {
                updatedTravel.plans[dayIndex].items = updatedAIPlans;
              } else {
                updatedTravel.plans.push({
                  day: selectedDay,
                  items: updatedAIPlans,
                });
              }

              parsedTravels[travelIndex] = updatedTravel;

              await AsyncStorage.setItem(
                'travels',
                JSON.stringify(parsedTravels),
              );

              Alert.alert(
                '적용 완료',
                'AI 피드백이 일정에 성공적으로 적용되었습니다.',
              );
              navigation.goBack();
            } catch (error) {
              console.error('AI 피드백 적용 실패:', error);
              Alert.alert(
                '적용 실패',
                '일정 적용 중 문제가 발생했습니다. 다시 시도해주세요.',
              );
            }
          },
        },
      ],
      {cancelable: true},
    );
  };

  return {
    selectedTravel,
    AIPlans,
    selectedDay,
    selectedDate,
    handleGoBack,
    deleteAIPlan,
    handleSaveFeedback,
  };
}
