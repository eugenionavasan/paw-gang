import { NavigationContainer } from '@react-navigation/native';
import Login from './pages/Login/Login';
import {Stack} from './/services/services';
import MainTabs from './components/Navigator/Navigator';


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Main" component={MainTabs} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
