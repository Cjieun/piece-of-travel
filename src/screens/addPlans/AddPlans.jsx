import BackButton from '../../components/backButton/BackButton';
import {GlobalView} from '../../styles/GlobalStyle';
import {
  AddPlansContainer,
  AddPlansForm,
  AddPlansFormBox,
  AddPlansHeadText,
  AddPlansInput,
  AddPlansMap,
  AddPlansMapInput,
  Label,
} from './styles';
import TextInput from '../../components/textInput/TextInput';
import {useAddPlans} from './hooks';
import CustomButton from '../../components/customButton/CustomButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Platform, TouchableOpacity} from 'react-native';

export default function AddPlans() {
  const {
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
  } = useAddPlans();

  return (
    <GlobalView backgroundColor="#f9f7f7">
      <AddPlansContainer>
        <BackButton />
        <AddPlansHeadText>여행 일정 추가중</AddPlansHeadText>
        <AddPlansFormBox>
          <AddPlansForm>
            <AddPlansInput>
              <Label>일정 이름</Label>
              <TextInput
                placeholder="일정 제목을 입력하세요"
                value={title}
                onChangeText={setTitle}
              />
            </AddPlansInput>
            <AddPlansInput>
              <Label>일정 시작 시간</Label>
              <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                <TextInput
                  placeholder="일정 시작 시간을 선택하세요"
                  value={inputTime}
                  onChangeText={setInputTime}
                  editable={false}
                />
              </TouchableOpacity>
              {showTimePicker && (
                <DateTimePicker
                  value={time}
                  mode="time"
                  is24Hour={true}
                  display={Platform.OS === 'ios' ? 'inline' : 'default'}
                  onChange={handleTimeChange}
                />
              )}
            </AddPlansInput>
            <AddPlansMapInput>
              <AddPlansInput>
                <Label>장소</Label>
                <TextInput
                  placeholder="일정 장소를 입력하세요"
                  value={place}
                  onChangeText={setPlace}
                />
              </AddPlansInput>
            </AddPlansMapInput>
            <AddPlansInput>
              <Label>추가 메모</Label>
              <TextInput
                placeholder="추가 메모 사항을 입력하세요"
                value={memo}
                onChangeText={setMemo}
              />
            </AddPlansInput>
          </AddPlansForm>
          <CustomButton
            title="추가하기"
            type="primary"
            onPress={handleSubmit}
          />
        </AddPlansFormBox>
      </AddPlansContainer>
    </GlobalView>
  );
}
