import React, {useState} from 'react';
import {View, Text, Platform, Alert} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  AddTravelsContainer,
  HeaderText,
  Label,
  MapPlaceholder,
  DatePickerButton,
  AddTravelsForm,
} from './styles';
import CustomButton from '../../components/customButton/CustomButton';
import TextInput from '../../components/textInput/TextInput';
import BackButton from '../../components/backButton/BackButton';
import {useAddTravels} from './hooks';
import {GlobalView} from '../../styles/GlobalStyle';

export default function AddTravels() {
  const {saveTravel} = useAddTravels();
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
    console.log('Title:', title);
    console.log('Place:', place);

    if (!title.trim() || !place.trim()) {
      Alert.alert('Error', '여행 이름과 여행지를 입력하세요.');
      return;
    }

    await saveTravel({title, place, startDate, endDate});
  };

  return (
    <GlobalView backgroundColor="#f9f7f7">
      <AddTravelsContainer>
        <View>
          <BackButton />
          <HeaderText>여행 추가중</HeaderText>
          <AddTravelsForm>
            <View>
              <Label>여행 이름</Label>
              <TextInput
                placeholder="여행 이름을 입력하세요"
                value={title}
                onChangeText={setTitle}
              />
            </View>
            <View>
              <Label>여행 기간</Label>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                {/* 시작일 */}
                <DatePickerButton onPress={() => openPicker('start')}>
                  <Text style={{textAlign: 'center'}}>
                    {startDate.toISOString().split('T')[0]}
                  </Text>
                </DatePickerButton>
                <Text style={{marginHorizontal: 8}}>~</Text>
                {/* 종료일 */}
                <DatePickerButton onPress={() => openPicker('end')}>
                  <Text style={{textAlign: 'center'}}>
                    {endDate.toISOString().split('T')[0]}
                  </Text>
                </DatePickerButton>
              </View>
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
            <View>
              <Label style={{marginTop: '8'}}>여행지</Label>
              <TextInput
                placeholder="여행지를 입력하세요"
                value={place}
                onChangeText={setPlace}
              />
              <MapPlaceholder />
            </View>
          </AddTravelsForm>
        </View>
        <CustomButton title="추가하기" onPress={handleSave} />
      </AddTravelsContainer>
    </GlobalView>
  );
}
