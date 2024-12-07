import {GlobalView} from '../../styles/GlobalStyle';
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
  DetailDateText,
  DetailFlatList,
  DetailAIButton,
  DetailButtonPair,
} from './styles';
import BackButton from '../../components/backButton/BackButton';
import {Image} from 'react-native';
import {useDetail} from './hooks';
import DaySelect from '../../components/daySelect/DaySelect';
import NoneBox from '../../components/noneBox/NoneBox';
import PlanBox from '../../components/plan/PlanBox';
import CustomButton from '../../components/customButton/CustomButton';

export const plans = [
  {
    day: 1,
    items: [
      {
        time: '오후 1:00',
        title: '공항 도착',
        place: '후쿠오카 국제 공항',
        mapPlace: '3 Chome-2-19 Tenjin, Chuo Ward, Fukuoka, 810-0001',
        memo: '4번 출구로 나간 후 셔틀버스 탑승',
        isDone: false,
        puzzles: [],
        AI: false,
      },
      {
        time: '오후 3:00',
        title: '호텔 체크인',
        place: '그랜드 호텔',
        mapPlace: '4 Chome-2-1 Hakata, Fukuoka',
        memo: '체크인 후 짐 정리',
        isDone: false,
        puzzles: [],
        AI: false,
      },
    ],
  },
  {
    day: 2,
    items: [
      {
        time: '오전 9:00',
        title: '아침 식사',
        place: '카페 모닝 브리즈',
        mapPlace: '1 Chome-1-1 Tenjin, Chuo Ward, Fukuoka',
        memo: '아침 메뉴 확인 후 주문',
        isDone: false,
        puzzles: [],
        AI: false,
      },
      {
        time: '오후 1:30',
        title: '쇼핑',
        place: '텐진 지하가',
        mapPlace: 'Hakata Ward, Tenjin, Fukuoka',
        memo: '쇼핑 후 카페 휴식',
        isDone: false,
        puzzles: [],
        AI: false,
      },
    ],
  },
];

export default function Detail() {
  const {
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
  } = useDetail();

  if (!travel) {
    return null;
  }

  return (
    <GlobalView>
      <DetailContainer>
        <DetailHeader>
          <BackButton />
          <DetailHeaderText>{title}</DetailHeaderText>
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
        <DetailDateText>{getSelectedDate()}</DetailDateText>
        <DetailFlatList
          data={selectedPlans}
          keyExtractor={item => item.time}
          renderItem={({item, index}) => (
            <PlanBox
              index={index + 1}
              time={item.time}
              title={item.title}
              place={item.place}
              mapPlace={item.mapPlace}
              memo={item.memo}
              isDone={item.isDone}
              puzzles={item.puzzles}
              AI={item.AI}
              day={selectedDay}
              travelId={travel.id}
              onDelete={fetchTravel}
            />
          )}
          ListEmptyComponent={<NoneBox onPress={handleAddPlans} />}
          contentContainerStyle={{
            paddingTop: 3,
            paddingRight: 6,
          }}
          ListFooterComponent={
            selectedPlans.length > 0 && !allPlansDone ? (
              <DetailButtonPair>
                <CustomButton
                  title="추가하기"
                  type="secondary"
                  onPress={handleAddPlans}
                />
                <CustomButton
                  title="완료하기"
                  type="primary"
                  onPress={handlePlansDone}
                />
              </DetailButtonPair>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
        <DetailAIButton>
          <Image
            source={require('../../assets/images/AI.png')}
            style={{width: 60, height: 60}}
          />
        </DetailAIButton>
      </DetailContainer>
    </GlobalView>
  );
}
