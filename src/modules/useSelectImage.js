import {useState} from 'react';
import * as ImagePicker from 'expo-image-picker';
import {uploadImage} from '../api/uploadImage';

export const useSelectImage = () => {
  const [images, setImages] = useState([null, null, null]);
  const [image, setImage] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([null, null, null]);
  const [uploadedUrl, setUploadedUrl] = useState(null);

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
      const selectedUri = result.assets[0].uri;

      if (index !== undefined) {
        const newImages = [...images];
        newImages[index] = selectedUri;
        setImages(newImages);

        const uploadedUrl = await uploadImage(selectedUri);
        if (uploadedUrl) {
          const newUrls = [...uploadedUrls];
          newUrls[index] = uploadedUrl;
          setUploadedUrls(newUrls);
        }
      } else {
        setImage(selectedUri);

        const uploadedUrl = await uploadImage(selectedUri);
        if (uploadedUrl) {
          setUploadedUrl(uploadedUrl);
        }
      }
    }
  };

  return {
    images,
    uploadedUrls,
    image,
    uploadedUrl,
    handleImageSelect,
  };
};
