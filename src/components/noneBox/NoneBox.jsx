import {Image} from 'react-native';
import {MainNoneBox, MainNoneBoxText} from './styles';

export default function NoneBox({onPress}) {
  return (
    <MainNoneBox onPress={onPress}>
      <Image
        source={require('../../assets/images/add.png')}
        style={{width: 60, height: 60}}
      />
      <MainNoneBoxText>여행 일정을 등록해보세요 !</MainNoneBoxText>
    </MainNoneBox>
  );
}
