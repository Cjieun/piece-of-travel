import {useNavigation} from '@react-navigation/native';

export const useMainBox = id => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('Detail', {id});
  };

  return {handlePress};
};
