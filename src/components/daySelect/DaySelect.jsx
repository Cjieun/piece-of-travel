import {DaySelectBox, DaySelectText} from './styles';

export default function DaySelect({day, isSelected, onPress}) {
  return (
    <DaySelectBox onPress={onPress} isSelected={isSelected}>
      <DaySelectText isSelected={isSelected}>Day {day}</DaySelectText>
    </DaySelectBox>
  );
}
