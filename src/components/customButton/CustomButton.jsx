import React from 'react';
import {TouchableOpacity} from 'react-native';
import {ButtonContainer, ButtonText} from './styles';

export default function CustomButton({title, onPress}) {
  return (
    <ButtonContainer onPress={onPress}>
      <TouchableOpacity onPress={onPress}>
        <ButtonText>{title}</ButtonText>
      </TouchableOpacity>
    </ButtonContainer>
  );
}
