import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import {GlobalView} from '../../styles/GlobalStyle';
import BackButton from '../../components/backButton/BackButton';
import TextInput from '../../components/textInput/TextInput';
import {AddDetailContainer, HeaderText, Label, MapPlaceholder} from './styles';
import CustomButton from '../../components/customButton/CustomButton';

export default function AddDetail() {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const [place, setPlace] = useState('');
  const [memo, setMemo] = useState('');
  return (
    <GlobalView backgroundColor="#f9f7f7">
      <AddDetailContainer>
        <BackButton />
        <HeaderText>여행 일정 추가중</HeaderText>
        <Label>일정 이름</Label>
        <TextInput
          placeholder="여행 이름을 입력하세요"
          value={title}
          onChangeText={setTitle}
        />
        <Label>일정 시작 시간</Label>
        <TextInput
          placeholder="일정 시작 시간을 선택해주세요"
          value={time}
          onChangeText={setTime}
        />
        <Label>장소</Label>
        <TextInput
          placeholder="장소를 입력해주세요"
          value={place}
          onChangeText={setPlace}
        />
        <Label>지도</Label>
        <MapPlaceholder />
        <Label>메모</Label>
        <TextInput
          placeholder={'메모를 입력해주세요'}
          value={memo}
          onChangeText={setMemo}
        />
        <CustomButton title="추가하기" />
      </AddDetailContainer>
    </GlobalView>
  );
}
