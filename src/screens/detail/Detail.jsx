import {GlobalView} from '../../styles/GlobalStyle';
import React, {useState} from 'react';
import {
  DetailContainer,
  DetailHeader,
  DetailHeaderKebab,
  DetailHeaderText,
  DetailKebabContainer,
  DetailKebabTop,
  DetailKebabText,
  DetailKebabBottom,
  DetailMap,
  DetailSelectBox,
  AddDetailButton,
  AddDetailButtonText,
  DetailNoneBox,
  DetailNoneBoxText,
  DetailDateText,
} from './styles';
import BackButton from '../../components/backButton/BackButton';
import {Image} from 'react-native';
import {useDetail} from './hooks';
import {useNavigateToAddDetail} from './hooks';
import DaySelect from '../../components/daySelect/DaySelect';
import NoneBox from '../../components/noneBox/NoneBox';
import PlanNum from '../../components/plan/PlanNum';
import PlanBox from '../../components/plan/PlanBox';

export default function Detail() {
  const [plans, setPlans] = useState([]);
  const {showKebab, toggleKebab, dayLabels, selectedDay, setSelectedDay} =
    useDetail();

  const {navigateToAddDetail} = useNavigateToAddDetail();

  return (
    <GlobalView>
      <DetailContainer>
        <DetailHeader>
          <BackButton />
          <DetailHeaderText>후쿠오카 가족 여행</DetailHeaderText>
          <DetailHeaderKebab onPress={toggleKebab}>
            <Image
              source={require('../../assets/images/kebab.png')}
              style={{width: 26, height: 26}}
            />
          </DetailHeaderKebab>
          {showKebab && (
            <DetailKebabContainer>
              <DetailKebabTop>
                <DetailKebabText>수정하기</DetailKebabText>
              </DetailKebabTop>
              <DetailKebabBottom>
                <DetailKebabText>삭제하기</DetailKebabText>
              </DetailKebabBottom>
            </DetailKebabContainer>
          )}
        </DetailHeader>
        <DetailMap />
        <DetailSelectBox>
          {dayLabels.map(day => (
            <DaySelect
              day={day}
              key={day}
              isSelected={selectedDay === day}
              onPress={() => setSelectedDay(day)}
            />
          ))}
        </DetailSelectBox>
        <DetailDateText>2024.10.14</DetailDateText>
        <NoneBox onPress={navigateToAddDetail} />
        <PlanNum num="1" />
        <PlanBox
          title="공항 도착"
          place="후쿠오카 국제 공항"
          mapPlace="3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001"
          memo="4번 출구로 나간 후 셔틀버스 탑승"
          isDone={false}
          puzzles={[]}
          AI={false}
        />
        <AddDetailButton onPress={navigateToAddDetail}>
          <AddDetailButtonText>추가하기</AddDetailButtonText>
        </AddDetailButton>
        {/* {plans.length > 0 ? (
          <AddDetailButton onPress={navigateToAddDetail}>
            <AddDetailButtonText>추가하기</AddDetailButtonText>
          </AddDetailButton>
        ) : (
            <NoneBox onPress={navigateToAddDetail} />
        )} */}
      </DetailContainer>
    </GlobalView>
  );
}
