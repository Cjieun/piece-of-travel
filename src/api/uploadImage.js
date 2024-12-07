import {API_BASE_URL} from '../config';
export const uploadImage = async uri => {
  const formData = new FormData();
  formData.append('file', {
    uri,
    name: `uploaded_image_${Date.now()}.png`,
    type: 'image/png',
  });

  try {
    const response = await fetch(`${API_BASE_URL}/api/files/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    });

    const text = await response.text();
    if (response.ok) {
      console.log('Server Response:', text);
      return text;
    } else {
      console.error('Upload failed:', response.status, text);
      Alert.alert('업로드 실패', `Status: ${response.status}`);
      return null;
    }
  } catch (error) {
    console.error('Error uploading image:', error.message);
    Alert.alert('네트워크 오류', error.message);
    return null;
  }
};
