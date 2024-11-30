import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const MainBoxContainer = styled.View`
  width: 100%;
  padding: 15px 15px 20px 15px;
  margin-bottom: 16px;
  border-radius: 10px;
  background: #dbe2ef;
`;

export const MainBoxImage = styled.Image`
  border-radius: 10px;
  height: 245px;
  width: 100%;
  background-size: cover;
  margin-bottom: 15px;
`;

export const MainBoxContent = styled.View`
  gap: 15px;
  padding: 0 2px 0 10px;
`;

export const MainBoxTitleBox = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const MainBoxTitleText = styled(GlobalText).attrs({weight: 'bold'})`
  color: #333;
  font-size: 16px;
`;

export const MainBoxDescriptionBox = styled.View`
  gap: 10px;
`;

export const MainBoxDescriptionPair = styled.View`
  flex-direction: row;
  gap: 10px;
  align-items: center;
`;

export const MainBoxDescriptionText = styled(GlobalText).attrs({
  weight: 'light',
})`
  color: #585858;
  font-size: 14px;
`;

export const MainBoxPiecesText = styled(GlobalText).attrs({
  weight: 'light',
})`
  color: #8b8b8b;
  font-size: 12px;
`;
