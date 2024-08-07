import PlanScreen from '../../pages/PlanScreen/PlanScreen';
import ProfileScreen from '../../pages/ProfileScreen/ProfileScreen';
import LogoHeader from '../../components/LogoHeader/LogoHeader';
import SearchStack from '../../components/SearchStack/SearchStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

export const Tab = createBottomTabNavigator();

function MainTabs () {
  return (
    <>
      <LogoHeader />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'SearchTab') {
              iconName = focused ? 'search' : 'search-outline';
            } else if (route.name === 'MyPlansTab') {
              iconName = focused ? 'list' : 'list-outline';
            } else if (route.name === 'ProfileTab') {
              iconName = focused ? 'person' : 'person-outline';
            }

            return (
              <Icon
                name={iconName || 'list-outline'}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#008CBA',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="SearchTab"
          component={SearchStack}
          options={{title: 'Search'}}
        />
        <Tab.Screen
          name="MyPlansTab"
          component={PlanScreen}
          options={{title: 'My Plans'}}
        />
        <Tab.Screen
          name="ProfileTab"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        />
      </Tab.Navigator>
    </>
  );
}

export default MainTabs
