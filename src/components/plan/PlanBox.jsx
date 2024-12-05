import {TouchableOpacity, View, Image} from 'react-native';
import {
  PlanAIDelete,
  PlanBoxBox,
  PlanBoxContainer,
  PlanBoxMapPlace,
  PlanBoxMemo,
  PlanBoxPlace,
  PlanBoxTitle,
  PlanContainer,
  PlanNumTime,
} from './styles';
import PlanNum from './PlanNum';

export default function PlanBox({
  index,
  time,
  title,
  place,
  mapPlace,
  memo,
  isDone,
  puzzles,
  AI,
}) {
  return (
    <PlanContainer>
      <PlanNum>{index}</PlanNum>
      <PlanBoxContainer>
        <PlanNumTime>{time}</PlanNumTime>
        <PlanBoxBox>
          <View>
            <PlanBoxTitle>{title}</PlanBoxTitle>
            <PlanBoxPlace>{place}</PlanBoxPlace>
            <PlanBoxMapPlace>{mapPlace}</PlanBoxMapPlace>
            <PlanBoxMemo>{memo}</PlanBoxMemo>
          </View>
          <TouchableOpacity>
            {!AI &&
              (!isDone ? (
                <Image
                  source={require('../../assets/images/delete.png')}
                  style={{width: 20, height: 20}}
                />
              ) : puzzles.length === 0 ? (
                <Image
                  source={require('../../assets/images/puzzle-outline.png')}
                  style={{width: 20, height: 20}}
                />
              ) : (
                <Image
                  source={require('../../assets/images/puzzle.png')}
                  style={{width: 17.5, height: 17.5}}
                />
              ))}
          </TouchableOpacity>
        </PlanBoxBox>
      </PlanBoxContainer>
      {AI && (
        <PlanAIDelete>
          <Image
            source={require('../../assets/images/delete_ai.png')}
            style={{width: 24, height: 24}}
          />
        </PlanAIDelete>
      )}
    </PlanContainer>
  );
}
