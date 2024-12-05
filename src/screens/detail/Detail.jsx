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
  DetailButton,
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

const plans = [
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
    time: '오후 1:20',
    title: '점심 식사',
    place: '이치란 라멘',
    mapPlace: '2 Chome-2-1, Hakata Ekimae, Hakata Ward, Fukuoka',
    memo: '텐진지하가 거리와 조금 가까운 곳!',
    isDone: false,
    puzzles: [],
    AI: false,
  },
  {
    time: '오후 2:30',
    title: '지하 쇼핑 센터 구경',
    place: '텐진 지하가',
    mapPlace: '810-0001 Hakata Ward, Tenjin, Fukuoka',
    memo: '모든 구간 와이파이 무료 이용 가능, 애플 파이 꼭 먹기',
    isDone: false,
    puzzles: [],
    AI: false,
  },
];

export default function Detail() {
  const {showKebab, toggleKebab, dayLabels, selectedDay, setSelectedDay} =
    useDetail();

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
        <DetailFlatList
          data={plans}
          keyExtractor={(item, index) => index.toString()}
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
            />
          )}
          ListEmptyComponent={<NoneBox />}
          contentContainerStyle={{
            paddingTop: 3,
            paddingRight: 6,
          }}
          ListFooterComponent={
            <DetailButtonPair>
              <CustomButton title="추가하기" type="secondary" />
              <CustomButton title="완료하기" type="primary" />
            </DetailButtonPair>
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
