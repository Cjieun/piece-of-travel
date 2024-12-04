import styled from 'styled-components/native';

export const GlobalText = styled.Text`
  font-family: ${({weight}) =>
    weight === 'bold'
      ? 'Pretendard-Bold'
      : weight === 'light'
        ? 'Pretendard-Regular'
        : weight === 'semiBold'
          ? 'Pretendard-SemiBold'
          : 'Pretendard-Medium'};
`;

export const GlobalView = styled.View`
  flex: 1;
  padding: 47px 20px 0 20px;
  align-items: center;
  background-color: ${({backgroundColor}) => backgroundColor || '#fff'};
`;
