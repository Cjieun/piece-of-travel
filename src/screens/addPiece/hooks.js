import {useState} from 'react';
import {Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from '../../api/uploadImage';

export const useAddPiece = () => {
  const [images, setImages] = useState([null, null, null]);
  const [uploadedUrls, setUploadedUrls] = useState([null, null, null]);
  const [content, setContent] = useState('');

  const handleImageSelect = async index => {
    const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('권한 필요', '사진 접근 권한을 허용해주세요.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const newImages = [...images];
      newImages[index] = result.assets[0].uri;
      setImages(newImages);

      const uploadedUrl = await uploadImage(result.assets[0].uri);
      if (uploadedUrl) {
        const newUrls = [...uploadedUrls];
        newUrls[index] = uploadedUrl;
        setUploadedUrls(newUrls);
      }
    }
  };

  const handleSubmit = () => {
    const validUrls = uploadedUrls.filter(Boolean);
    if (validUrls.length < 1 || !content.trim()) {
      Alert.alert(
        '입력 필요',
        '최소 1개의 이미지를 업로드하고 내용을 입력하세요.',
      );
      return;
    }

    const puzzleData = {
      puzzle: {
        images: validUrls,
        content: content.trim(),
      },
    };

    console.log('Puzzle Data:', JSON.stringify(puzzleData, null, 2));
    Alert.alert(
      '작성 완료',
      `Puzzle Data:\n${JSON.stringify(puzzleData, null, 2)}`,
    );
  };

  return {
    images,
    uploadedUrls,
    content,
    setContent,
    handleImageSelect,
    handleSubmit,
  };
};
