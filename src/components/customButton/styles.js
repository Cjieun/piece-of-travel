import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const ButtonContainer = styled.TouchableOpacity`
  width: ${({size}) => (size === 's' ? '49%' : '100%')};
  height: 50px;
  border-radius: 10px;
  background-color: ${({type}) => (type === 'primary' ? '#3f72af' : '#fff')};
  border-width: ${({type}) => (type === 'secondary' ? '1px' : '0')};
  border-color: ${({type}) => (type === 'secondary' ? '#3f72af' : 'none')};
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  font-size: 16px;
  color: ${({type}) => (type === 'primary' ? '#fff' : '#3f72af')};
`;
