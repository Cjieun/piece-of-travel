import {useNavigation} from '@react-navigation/native';

export const useMain = id => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('addTravels');
  };

  return {handlePress};
};
