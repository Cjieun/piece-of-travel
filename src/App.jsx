import {StatusBar} from 'react-native';
import Navigation from './navigate/Navigation';
import useFont from './modules/useFont';

export default function App() {
  const {fontsLoaded} = useFont();

  if (!fontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor="transparent" barStyle="dark-content" />
      <Navigation />
    </>
  );
}
