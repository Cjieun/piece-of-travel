import React from 'react';
import {View, Text, Platform} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {
  EditTravelsContainer,
  HeaderText,
  Label,
  MapPlaceholder,
  DatePickerButton,
  EditTravelsForm,
} from './styles';
import CustomButton from '../../components/customButton/CustomButton';
import TextInput from '../../components/textInput/TextInput';
import BackButton from '../../components/backButton/BackButton';
import {GlobalView} from '../../styles/GlobalStyle';
import {useEditTravel} from './hooks';

export default function EditTravels() {
  const {
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
  } = useEditTravel();

  return (
    <GlobalView backgroundColor="#f9f7f7">
      <EditTravelsContainer>
        <View>
          <BackButton />
          <HeaderText>여행 수정중</HeaderText>
          <EditTravelsForm>
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
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          </EditTravelsForm>
        </View>
        <CustomButton title="수정하기" onPress={handleUpdate} />
      </EditTravelsContainer>
    </GlobalView>
  );
}
