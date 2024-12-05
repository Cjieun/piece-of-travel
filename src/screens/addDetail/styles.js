import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const AddDetailContainer = styled.View`
  flex: 1;
  width: 100%;
`;
export const HeaderText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  font-size: 25px;
  color: #000;
  margin: 10px 5px;
`;

export const Label = styled(GlobalText).attrs({
  weight: 'medium',
})`
  font-size: 14px;
  color: #333333;
  margin-left: 5px;
  margin-bottom: 2px;
`;

export const MapPlaceholder = styled.View`
  height: 200px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
`;
