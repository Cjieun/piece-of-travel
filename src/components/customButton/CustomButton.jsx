import React from 'react';
import {ButtonContainer, ButtonText} from './styles';

export default function CustomButton({title, onPress, type = 'primary'}) {
  return (
    <ButtonContainer onPress={onPress} type={type}>
      <ButtonText type={type}>{title}</ButtonText>
    </ButtonContainer>
  );
}
