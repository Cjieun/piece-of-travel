import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const MainNoneBox = styled.TouchableOpacity`
  height: 150px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid #d7d7d7;
  background-color: #fff;
`;

export const MainNoneBoxText = styled(GlobalText)`
  color: #b8b8b8;
  font-size: 14px;
`;
