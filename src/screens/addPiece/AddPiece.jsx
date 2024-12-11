import React from 'react';
import {Image} from 'react-native';
import {
  AddPieceContainer,
  HeaderText,
  ImageUploadContainer,
  ImageUploadBox,
  AddImage,
  PieceMemo,
} from './styles';
import BackButton from '../../components/backButton/BackButton';
import {GlobalView} from '../../styles/GlobalStyle';
import CustomButton from '../../components/customButton/CustomButton';
import {useAddPiece} from './hooks';
import {useSelectImage} from '../../modules/useSelectImage';

export default function AddPiece() {
  const {images, uploadedUrls, handleImageSelect} = useSelectImage();
  const {content, setContent, handleSubmit} = useAddPiece(uploadedUrls);

  return (
    <GlobalView backgroundColor="#f9f7f7">
      <AddPieceContainer>
        <BackButton />
        <HeaderText>조각 작성중</HeaderText>
        <ImageUploadContainer>
          {images.map((image, index) => (
            <ImageUploadBox
              key={index}
              onPress={() => handleImageSelect(index)}>
              {image ? (
                <Image
                  source={{uri: image}}
                  style={{width: '100%', height: '100%', borderRadius: 8}}
                />
              ) : (
                <AddImage source={require('../../assets/images/add.png')} />
              )}
            </ImageUploadBox>
          ))}
        </ImageUploadContainer>
        <PieceMemo
          placeholder="조각을 완성하세요..."
          value={content}
          onChangeText={setContent}
        />
        <CustomButton title={'작성 완료'} onPress={handleSubmit} />
      </AddPieceContainer>
    </GlobalView>
  );
}
