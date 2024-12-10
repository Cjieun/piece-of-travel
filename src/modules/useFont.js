import * as Font from 'expo-font';
import {useState, useEffect} from 'react';
import {setCustomText} from 'react-native-global-props';

export default function useFont() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'Pretendard-Regular': require('../assets/fonts/Pretendard-Regular.ttf'),
        'Pretendard-Medium': require('../assets/fonts/Pretendard-Medium.ttf'),
        'Pretendard-Bold': require('../assets/fonts/Pretendard-Bold.ttf'),
        'Pretendard-SemiBold': require('../assets/fonts/Pretendard-SemiBold.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const customRegularTextProps = {
    style: {
      fontFamily: 'Pretendard-Regular',
    },
  };
  const customMediumTextProps = {
    style: {
      fontFamily: 'Pretendard-Medium',
    },
  };
  const customBoldTextProps = {
    style: {
      fontFamily: 'Pretendard-Bold',
    },
  };
  const customSemiBoldTextProps = {
    style: {
      fontFamily: 'Pretendard-SemiBold',
    },
  };

  setCustomText(customRegularTextProps);
  setCustomText(customMediumTextProps);
  setCustomText(customBoldTextProps);
  setCustomText(customSemiBoldTextProps);

  return {
    fontsLoaded,
  };
}
