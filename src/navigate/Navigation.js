import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Layout from '../screens/Layout';
import Main from '../screens/main/Main';
import AddTravels from '../screens/addTravels/AddTravels';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="/" component={Main} />
        <Stack.Screen name="/test" component={Layout} />
        <Stack.Screen name="/addTravels" component={AddTravels} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
