import ParkSchedule from '../../pages/ParkSchedule/ParkSchedule';
import SearchScreen from '../../pages/SearchScreen/SearchScreen';
import { Stack } from '../../services/services';


function SearchStack () {
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
