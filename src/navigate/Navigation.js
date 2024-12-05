import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Layout from '../screens/Layout';
import Main from '../screens/main/Main';
import AddTravels from '../screens/addTravels/AddTravels';
import Detail from '../screens/detail/Detail';
import AddDetail from '../screens/addDetail/AddDetail';

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="/test" component={Layout} />
        <Stack.Screen name="addTravels" component={AddTravels} />
        <Stack.Screen name="detail" component={Detail} />
        <Stack.Screen name="addDetail" component={AddDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
