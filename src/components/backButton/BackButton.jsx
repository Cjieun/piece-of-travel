import React from 'react';
import {TouchableOpacity, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {BackButtonContainer, BackButtonImage} from './styles';

export default function BackButton({onPress}) {
  const navigation = useNavigation();

  const handlePress = () => {
    if (onPress) {
      onPress(); // 사용자 정의 동작 실행
    } else {
      navigation.goBack(); // 기본 동작: 뒤로가기
    }
  };

  return (
    <BackButtonContainer onPress={handlePress}>
      <BackButtonImage source={require('../../assets/images/back.png')} />
    </BackButtonContainer>
  );
}
