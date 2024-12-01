import React, {useState} from 'react';
import {View, Text, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  AddTravelsContainer,
  HeaderText,
  Label,
  MapPlaceholder,
  DatePickerButton,
} from './styles';
import CustomButton from '../../components/customButton/CustomButton';
import TextInput from '../../components/textInput/TextInput';
import BackButton from '../../components/backButton/BackButton';
import {useAddTravels} from './hooks'; // hooks.js 가져오기

export default function AddTravels() {
  const {saveTravel} = useAddTravels(); // 훅 사용
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('');
  const [title, setTitle] = useState('');
  const [place, setPlace] = useState('');

  const handleDateConfirm = (event, selectedDate) => {
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

  const handleSave = async () => {
    // Title과 Place 값 확인
    console.log('Title:', title);
    console.log('Place:', place);

    if (!title.trim() || !place.trim()) {
      Alert.alert('Error', '여행 이름과 여행지를 입력하세요.');
      return;
    }

    // saveTravel 호출
    await saveTravel({title, place, startDate, endDate});
  };

  return (
    <>
      <BackButton />
      <AddTravelsContainer>
        <HeaderText>여행 추가중</HeaderText>

        <Label>여행 이름</Label>
        <TextInput
          placeholder="여행 이름을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />

        <Label>여행 기간</Label>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          {/* 시작일 */}
          <DatePickerButton onPress={() => openPicker('start')}>
            <Text style={{textAlign: 'center'}}>
              {startDate.toISOString().split('T')[0]}
            </Text>
          </DatePickerButton>

          {/* 종료일 */}
          <DatePickerButton onPress={() => openPicker('end')}>
            <Text style={{textAlign: 'center'}}>
              {endDate.toISOString().split('T')[0]}
            </Text>
          </DatePickerButton>
        </View>

        {showPicker && (
          <DateTimePicker
            value={currentPicker === 'start' ? startDate : endDate}
            minimumDate={currentPicker === 'end' ? startDate : undefined}
            mode="date"
            display={Platform.OS === 'ios' ? 'inline' : 'default'}
            onChange={handleDateConfirm}
          />
        )}

        <Label>여행지</Label>
        <TextInput
          placeholder="여행지를 입력하세요"
          value={place}
          onChangeText={setPlace}
        />

        <Label>지도</Label>
        <MapPlaceholder />

        <CustomButton title="추가하기" onPress={handleSave} />
      </AddTravelsContainer>
    </>
  );
}
