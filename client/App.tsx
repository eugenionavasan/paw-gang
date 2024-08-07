import {NavigationContainer} from '@react-navigation/native';
import Login from './pages/Login/Login';
import MainTabs from './components/Navigator/Navigator';
import {Stack} from './components/SearchStack/SearchStack';


export default function App () {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
