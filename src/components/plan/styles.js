import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const PlanNumContainer = styled.View`
  flex-direction: row;
  gap: 14px;
  align-items: center;
  position: absolute;
  top: -3;
  left: -10;
`;

export const PlanNumBox = styled.View`
  width: 21px;
  height: 21px;
  background-color: #3f72af;
  align-items: center;
  justify-content: center;
  border-radius: 21px;
`;

export const PlanNumText = styled(GlobalText).attrs({weight: 'light'})`
  color: #fff;
  font-size: 12px;
`;

export const PlanNumTime = styled(GlobalText).attrs({weight: 'semiBold'})`
  color: #333;
  font-size: 13px;
`;

export const PlanContainer = styled.View`
  position: relative;
  flex-direction: row;
  align-items: flex-start;
  padding-left: 25.5px;
  padding-bottom: 15px;
  margin-left: 10.5px;
  border-left-width: 1px;
  border-left-color: #dbe2ef;
`;

export const PlanBoxContainer = styled.View`
  flex: 1;
`;

export const PlanBoxBox = styled.View`
  padding: 14px 16px 15px 17.75px;
  flex-direction: row;
  justify-content: space-between;
  border-radius: 5px;
  background-color: #fff;
  elevation: 4;
  margin-top: 10px;
`;

export const PlanBoxTitle = styled(GlobalText).attrs({weight: 'semiBold'})`
  font-size: 16px;
  margin-bottom: 5px;
`;

export const PlanBoxPlace = styled(GlobalText).attrs({weight: 'semiBold'})`
  color: #585858;
  font-size: 13px;
  margin-bottom: 3px;
`;

export const PlanBoxMapPlace = styled(GlobalText)`
  color: #b8b8b8;
  font-size: 10px;
  margin-bottom: 10px;
`;

export const PlanBoxMemo = styled(GlobalText)`
  color: #333;
  font-size: 12px;
`;

export const PlanAIDelete = styled.TouchableOpacity`
  position: absolute;
  right: -10;
  top: 15;
`;
