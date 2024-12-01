import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const AddTravelsContainer = styled.View`
  flex: 1;
  padding: 80px 20px 20px;
  background-color: #ffffff;
`;

export const HeaderText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  font-size: 25px;
  color: #000;
  margin-bottom: 20px;
`;

export const Label = styled(GlobalText).attrs({
  weight: 'medium',
})`
  font-size: 14px;
  color: #333333;
  margin-bottom: 8px;
`;

export const MapPlaceholder = styled.View`
  height: 200px;
  border: 1px solid #d7d7d7;
  border-radius: 10px;
  background-color: #f2f2f2;
  margin-bottom: 20px;
`;

export const DatePickerButton = styled.TouchableOpacity`
  flex: 1;
  padding: 10px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin: 0 5px;
  justify-content: center;
  align-items: center;
`;