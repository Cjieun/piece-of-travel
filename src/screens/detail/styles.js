import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const DetailContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const DetailHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

export const AIDetailHeader = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
`;

export const AIBackButton = styled.View`
  position: absolute;
  left: -8px;
`;

export const DetailHeaderText = styled(GlobalText).attrs({weight: 'bold'})`
  color: #000;
  font-size: 24px;
`;

export const DetailHeaderKebab = styled.TouchableOpacity`
  position: relative;
`;

export const DetailKebabContainer = styled.View`
  position: absolute;
  right: 20px;
  top: 30px;
  width: 80px;
  height: 50px;
  background-color: #fff;
  border-radius: 5px;
  elevation: 5;
  z-index: 10;
`;

export const DetailKebabText = styled(GlobalText).attrs({weight: 'light'})`
  color: #b8b8b8;
  font-size: 12px;
`;

export const DetailKebabItem = styled.TouchableOpacity`
  flex-direction: row;
  height: 25px;
  justify-content: center;
  align-items: center;
`;

export const DetailKebabTop = styled(DetailKebabItem)`
  border-bottom-width: 0.5px;
  border-bottom-color: #b8b8b8;
`;

export const DetailKebabBottom = styled(DetailKebabItem)``;

export const DetailImage = styled.Image`
  height: 210px;
  width: 100%;
  border-radius: 10px;
`;

export const DetailSelectScrollBox = styled.ScrollView`
  max-height: 70px;
`;

export const DetailSelectBox = styled.View`
  flex-direction: row;
  gap: 10px;
  padding: 20px 0 15px;
`;

export const DetailDateText = styled(GlobalText)`
  color: #585858;
  font-size: 16px;
  margin-bottom: 15px;
`;

export const DetailButtonPair = styled.View`
  gap: 8px;
  margin-top: 30px;
`;

export const DetailFlatList = styled.FlatList`
  flex-grow: 1;
`;

export const DetailAIButton = styled.TouchableOpacity`
  position: absolute;
  bottom: 30;
  right: 0;
`;

export const DetailAIButtonPair = styled.View`
  flex-direction: row;
  gap: 5px;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
`;
