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
  DetailSelectScrollBox,
} from './styles';
import BackButton from '../../components/backButton/BackButton';
import {Image} from 'react-native';
import {useDetail} from './hooks';
import DaySelect from '../../components/daySelect/DaySelect';
import NoneBox from '../../components/noneBox/NoneBox';
import PlanBox from '../../components/plan/PlanBox';
import CustomButton from '../../components/customButton/CustomButton';

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
    handleUpdateTravel,
    handleDeleteTravel,
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
              <DetailKebabTop onPress={handleUpdateTravel}>
                <DetailKebabText>수정하기</DetailKebabText>
              </DetailKebabTop>
              <DetailKebabBottom onPress={handleDeleteTravel}>
                <DetailKebabText>삭제하기</DetailKebabText>
              </DetailKebabBottom>
            </DetailKebabContainer>
          )}
        </DetailHeader>
        <DetailMap />
        <DetailSelectScrollBox
          horizontal={true}
          showsHorizontalScrollIndicator={false}>
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
        </DetailSelectScrollBox>
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
