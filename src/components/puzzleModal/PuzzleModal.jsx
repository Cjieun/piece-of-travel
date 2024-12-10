import React from 'react';
import {Modal, Image, ScrollView} from 'react-native';
import {
  Overlay,
  Content,
  Day,
  Title,
  PuzzleImage,
  Place,
  Memo,
  HeaderContainer,
} from './styles';

export default function PuzzleModal({
  visible,
  onClose,
  day,
  title,
  place,
  memo,
  images = [],
}) {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}>
      <Overlay>
        <Content>
          <HeaderContainer>
            <Day>Day {day}</Day>
            <Title>{title}</Title>
          </HeaderContainer>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={{
              flexDirection: 'row',
              alignItems: 'center',
            }}
            keyboardShouldPersistTaps="handled">
            {images.map((image, index) => (
              <PuzzleImage key={index} source={{uri: image}} />
            ))}
          </ScrollView>
          <Place>
            <Image
              source={require('../../assets/images/location.png')}
              style={{width: 16, height: 16}}
            />{' '}
            {place}
          </Place>
          <Memo>{memo}</Memo>
        </Content>
      </Overlay>
    </Modal>
  );
}
