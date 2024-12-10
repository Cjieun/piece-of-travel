import React, {useState} from 'react';
import {TouchableOpacity, View, Image, Alert} from 'react-native';
import {
  PlanAIDelete,
  PlanBoxBox,
  PlanBoxContainer,
  PlanBoxFeedback,
  PlanBoxMapPlace,
  PlanBoxMemo,
  PlanBoxPlace,
  PlanBoxTitle,
  PlanContainer,
  PlanNumTime,
} from './styles';
import PlanNum from './PlanNum';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import PuzzleModal from '../puzzleModal/PuzzleModal';

export default function PlanBox({
  index,
  time,
  title,
  place,
  mapPlace,
  memo,
  isDone,
  puzzles,
  AI,
  feedback,
  day,
  travelId,
  onDelete,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const deleteItem = async () => {
    try {
      Alert.alert('삭제 확인', '이 일정을 삭제하시겠습니까?', [
        {text: '취소', style: 'cancel'},
        {
          text: '삭제',
          onPress: async () => {
            const storedTravels = await AsyncStorage.getItem('travels');
            if (!storedTravels) return;

            const parsedTravels = JSON.parse(storedTravels);

            const travelIndex = parsedTravels.findIndex(
              travel => travel.id === travelId,
            );

            const selectedTravel = parsedTravels[travelIndex];

            const dayIndex = selectedTravel.plans.findIndex(
              plan => plan.day === day,
            );

            if (dayIndex !== -1) {
              const items = selectedTravel.plans[dayIndex].items;

              const updatedItems = items.filter(item => item.time !== time);
              selectedTravel.plans[dayIndex].items = updatedItems;

              parsedTravels[travelIndex] = selectedTravel;
              await AsyncStorage.setItem(
                'travels',
                JSON.stringify(parsedTravels),
              );

              onDelete();
            }
          },
        },
      ]);
    } catch (error) {
      console.log('일정 삭제 실패: ', error);
    }
  };

  const addPuzzle = () => {
    navigation.navigate('addPiece', {
      travelId,
      day,
      itemId: index,
    });
  };

  return (
    <PlanContainer>
      <PlanNum>{index}</PlanNum>
      <PlanBoxContainer>
        <PlanNumTime>{time}</PlanNumTime>
        <PlanBoxBox>
          <View>
            <PlanBoxTitle>{title}</PlanBoxTitle>
            <PlanBoxPlace>{place}</PlanBoxPlace>
            <PlanBoxMapPlace>{mapPlace}</PlanBoxMapPlace>
            <PlanBoxMemo>{memo}</PlanBoxMemo>
          </View>
          {!AI &&
            feedback !== '' &&
            (!isDone ? (
              <TouchableOpacity onPress={deleteItem}>
                <Image
                  source={require('../../assets/images/delete.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            ) : Object.keys(puzzles).length === 0 ? (
              <TouchableOpacity onPress={addPuzzle}>
                <Image
                  source={require('../../assets/images/puzzle-outline.png')}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={openModal}>
                <Image
                  source={require('../../assets/images/puzzle.png')}
                  style={{width: 17.5, height: 17.5}}
                />
              </TouchableOpacity>
            ))}
        </PlanBoxBox>
        <PuzzleModal
          visible={modalVisible}
          onClose={closeModal}
          day={index}
          title={title}
          place={place}
          memo={memo}
          images={puzzles?.images || []}
        />
        {AI && feedback && <PlanBoxFeedback>{feedback}</PlanBoxFeedback>}
      </PlanBoxContainer>
      {AI && feedback && (
        <PlanAIDelete onPress={onDelete}>
          <Image
            source={require('../../assets/images/delete_ai.png')}
            style={{width: 24, height: 24}}
          />
        </PlanAIDelete>
      )}
    </PlanContainer>
  );
}
