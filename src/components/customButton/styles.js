import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const ButtonContainer = styled.View`
  height: 50px;
  border-radius: 10px;
  background-color: #3f72af;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  color: #ffffff;
  font-size: 16px;
`;
