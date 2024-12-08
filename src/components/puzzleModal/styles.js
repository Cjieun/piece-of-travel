import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const Overlay = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
`;

export const Content = styled.View`
  background-color: white;
  border-radius: 10px;
  width: 280px;
  height: 325px;
  padding: 20px;
`;
export const HeaderContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

export const Day = styled(GlobalText)`
  font-size: 16px;
  font-weight: 600;
  margin: 0 10px 0 0;
`;
export const Title = styled(GlobalText)`
  font-size: 14px;
  color: #6f6f6f;
  font-weight: 500;
`;

export const ImageContainer = styled.View`
  flex-direction: row;
  align-items: center;
  min-width: 100%;
`;

export const PuzzleImage = styled.Image`
  width: 135px;
  height: 152px;
  margin: 0 5px;
  border-radius: 8px;
`;

export const Place = styled(GlobalText)`
  font-size: 16px;
  margin: 10px;
  color: #555;
`;

export const Memo = styled(GlobalText)`
  font-size: 14px;
  color: #777;
  margin: 6px 10px;
`;
