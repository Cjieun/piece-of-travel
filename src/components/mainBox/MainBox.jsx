import {Image, TouchableOpacity} from 'react-native';
import {
  MainBoxContainer,
  MainBoxImage,
  MainBoxContent,
  MainBoxTitleBox,
  MainBoxTitleText,
  MainBoxDescriptionBox,
  MainBoxDescriptionPair,
  MainBoxDescriptionText,
  MainBoxPiecesText,
} from './styles';
import {calculateDays, formatDate} from '../../modules/useDate';
import {useMainBox} from './hooks';

export default function MainBox({
  id,
  image,
  title,
  place,
  beginDate,
  endDate,
  pieces,
}) {
  const days = calculateDays(beginDate, endDate);
  const formattedBeginDate = formatDate(beginDate);
  const formattedEndDate = formatDate(endDate);
  const {handlePress} = useMainBox(id);

  return (
    <MainBoxContainer>
      <MainBoxImage source={image} />
      <MainBoxContent>
        <MainBoxTitleBox>
          <MainBoxTitleText>{title}</MainBoxTitleText>
          <TouchableOpacity onPress={handlePress}>
            <Image
              source={require('../../assets/images/rightArrow.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>
        </MainBoxTitleBox>
        <MainBoxDescriptionBox>
          <MainBoxDescriptionPair>
            <Image
              source={require('../../assets/images/location.png')}
              style={{width: 20, height: 20}}
            />
            <MainBoxDescriptionText>{place}</MainBoxDescriptionText>
          </MainBoxDescriptionPair>
          <MainBoxDescriptionPair>
            <Image
              source={require('../../assets/images/date.png')}
              style={{width: 20, height: 20}}
            />
            <MainBoxDescriptionText>
              {days} Days ({formattedBeginDate} ~ {formattedEndDate})
            </MainBoxDescriptionText>
          </MainBoxDescriptionPair>
        </MainBoxDescriptionBox>
        <MainBoxPiecesText>{pieces}개의 조각</MainBoxPiecesText>
      </MainBoxContent>
    </MainBoxContainer>
  );
}
