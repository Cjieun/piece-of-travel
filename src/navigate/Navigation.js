import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Layout from '../screens/Layout';
import Main from '../screens/main/Main';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="/" component={Main} />
        <Stack.Screen name="/test" component={Layout} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
