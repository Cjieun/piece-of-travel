import React from 'react';
import {ButtonContainer, ButtonText} from './styles';

export default function CustomButton({
  title,
  onPress,
  type = 'primary',
  size = 'l',
}) {
  return (
    <ButtonContainer onPress={onPress} type={type} size={size}>
      <ButtonText type={type}>{title}</ButtonText>
    </ButtonContainer>
  );
}
