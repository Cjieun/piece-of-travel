import * as Font from 'expo-font';
import {useState, useEffect} from 'react';
import {setCustomText} from 'react-native-global-props';

export default function useFont() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        Pretendard: require('../assets/fonts/Pretendard-Regular.ttf'),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  const customTextProps = {
    style: {
      fontFamily: 'Pretendard',
    },
  };

  setCustomText(customTextProps);

  return {
    fontsLoaded,
  };
}
