import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const MainContainer = styled.View`
  flex: 1;
  width: 100%;
`;

export const MainBannerBox = styled.View`
  height: 61px;
  border-radius: 10px;
  background-color: #f9f7f7;
  margin: 15px 0 32px;
  justify-content: center;
`;

export const MainBannerText = styled(GlobalText)`
  color: #333;
  text-align: center;
  font-size: 14px;
`;

export const MainBannerSpan = styled(MainBannerText).attrs({weight: 'bold'})``;

export const MainAddCircle = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #3f72af;
  align-items: center;
  justify-content: center;
  margin-top: 16px;
`;

export const MainScrollView = styled.ScrollView.attrs({
  contentContainerStyle: {alignItems: 'center', paddingBottom: 32},
  showsVerticalScrollIndicator: false,
})``;
