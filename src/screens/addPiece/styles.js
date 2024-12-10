import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const AddPieceContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const HeaderText = styled(GlobalText).attrs({
  weight: 'bold',
})`
  font-size: 25px;
  color: #000;
  margin: 20px 0px;
`;

export const ImageUploadContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 20px 0px;
`;
export const ImageUploadBox = styled.TouchableOpacity`
  width: 110px;
  height: 124px;
  background-color: white;
  border-radius: 8px;
`;

export const AddImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 37px 30px;
`;

export const PieceMemo = styled.TextInput`
  width: 350px;
  height: 250px;
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  background-color: white;
  margin-bottom: 20px;
  text-align-vertical: top;
  padding: 10px;
`;
