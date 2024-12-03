import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const DaySelectBox = styled.TouchableOpacity`
  width: 68px;
  height: 35px;
  border-radius: 20px;
  border-width: ${({isSelected}) => (isSelected ? '0' : '1px')};
  border-color: ${({isSelected}) => (isSelected ? 'none' : '#d9d9d9')};
  background-color: ${({isSelected}) =>
    isSelected ? '#3f72af' : 'transparent'};
  align-items: center;
  justify-content: center;
`;

export const DaySelectText = styled(GlobalText)`
  color: ${({isSelected}) => (isSelected ? '#fff' : '#b8b8b8')};
  font-size: 14px;
`;
