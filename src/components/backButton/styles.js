import styled from 'styled-components/native';

export const BackButtonContainer = styled.TouchableOpacity`
  position: absolute; /* 화면 상단에 고정 */
  top: 30px; /* 상단에서 20px 떨어짐 */
  left: 5px; /* 왼쪽에서 10px 떨어짐 */
  z-index: 10; /* 다른 요소 위에 위치 */
  padding: 10px; /* 클릭 영역 확보 */
`;

export const BackButtonImage = styled.Image`
  width: 30px;
  height: 30px;
`;
