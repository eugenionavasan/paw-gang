import {createStackNavigator} from '@react-navigation/stack';
import ParkSchedule from '../../pages/ParkSchedule/ParkSchedule';
import SearchScreen from '../../pages/SearchScreen/SearchScreen';
import {RootStackParamList} from '../../Types/NavigationTypes';

export const Stack = createStackNavigator<RootStackParamList>();

function SearchStack (): JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ParkSchedule"
        component={ParkSchedule}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default SearchStack
