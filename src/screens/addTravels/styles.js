import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const AddTravelsContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-bottom: 36px;
  justify-content: space-between;
`;

export const HeaderText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  font-size: 25px;
  color: #000;
  margin-bottom: 20px;
  margin-top: 20px;
`;

export const Label = styled(GlobalText).attrs({
  weight: 'medium',
})`
  font-size: 14px;
  color: #333333;
  margin-left: 16px;
  margin-bottom: 8px;
`;

export const ImageUploadBox = styled.TouchableOpacity`
  height: 245px;
  width: 100%;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background-color: #ffffff;
  align-items: center;
  justify-content: center;
`;

export const AddImage = styled.Image`
  width: 50px;
  height: 50px;
`;

export const DatePickerButton = styled.TouchableOpacity`
  flex: 1;
  width: 160px;
  height: 52px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 8px;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

export const AddTravelsForm = styled.View`
  gap: 16px;
`;
