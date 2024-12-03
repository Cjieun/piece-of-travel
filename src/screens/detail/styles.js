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

export const DetailMap = styled.View`
  height: 210px;
  background-color: #d9d9d9;
`;

export const DetailSelectBox = styled.View`
  flex-direction: row;
  gap: 10px;
  margin: 20px 0 15px;
`;
