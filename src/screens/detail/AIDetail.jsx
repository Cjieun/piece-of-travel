import {GlobalView} from '../../styles/GlobalStyle';
import {
  DetailContainer,
  AIDetailHeader,
  DetailHeaderText,
  DetailSelectBox,
  DetailDateText,
  DetailFlatList,
  AIBackButton,
  DetailAIButtonPair,
} from './styles';
import BackButton from '../../components/backButton/BackButton';
import {useAIDetail} from './hooks';
import DaySelect from '../../components/daySelect/DaySelect';
import PlanBox from '../../components/plan/PlanBox';
import CustomButton from '../../components/customButton/CustomButton';

export default function AIDetail() {
  const {
    selectedTravel,
    AIPlans,
    selectedDay,
    selectedDate,
    handleGoBack,
    deleteAIPlan,
    handleSaveFeedback,
  } = useAIDetail();

  if (!selectedTravel) {
    return null;
  }

  return (
    <GlobalView>
      <DetailContainer>
        <AIDetailHeader>
          <AIBackButton>
            <BackButton />
          </AIBackButton>
          <DetailHeaderText>{selectedTravel.title}</DetailHeaderText>
        </AIDetailHeader>
        <DetailSelectBox>
          <DaySelect day={selectedDay} isSelected={true} />
        </DetailSelectBox>
        <DetailDateText>{selectedDate}</DetailDateText>
        <DetailFlatList
          data={AIPlans}
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
              feedback={item.feedback}
              day={selectedDay}
              travelId={selectedTravel.id}
              onDelete={() => deleteAIPlan(item.time)}
            />
          )}
          contentContainerStyle={{
            paddingTop: 3,
            paddingRight: 6,
            paddingBottom: 30.5,
          }}
          ListFooterComponent={
            AIPlans.length > 0 ? (
              <DetailAIButtonPair>
                <CustomButton
                  title="돌아가기"
                  type="secondary"
                  size="s"
                  onPress={handleGoBack}
                />
                <CustomButton
                  title="적용하기"
                  type="primary"
                  size="s"
                  onPress={handleSaveFeedback}
                />
              </DetailAIButtonPair>
            ) : null
          }
          showsVerticalScrollIndicator={false}
        />
      </DetailContainer>
    </GlobalView>
  );
}
