import styled from 'styled-components/native';
import {GlobalText} from '../../styles/GlobalStyle';

export const AddPlansContainer = styled.View`
  flex: 1;
  width: 100%;
  padding-bottom: 36px;
`;

export const AddPlansHeadText = styled(GlobalText).attrs({weight: 'bold'})`
  font-size: 24px;
  margin: 20px 0;
`;

export const AddPlansFormBox = styled.View`
  flex: 1;
  gap: 36px;
  justify-content: space-between;
`;

export const AddPlansForm = styled.View`
  gap: 16px;
`;

export const AddPlansInput = styled.View`
  gap: 5px;
`;

export const Label = styled(GlobalText)`
  color: #585858;
  font-size: 14px;
  margin-left: 16px;
`;

export const AddPlansMapInput = styled.View`
  gap: 10px;
`;

export const AddPlansMap = styled.View`
  height: 212px;
  border-radius: 8px;
  background-color: #d9d9d9;
`;
