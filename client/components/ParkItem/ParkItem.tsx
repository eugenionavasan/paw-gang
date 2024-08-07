import {
  View,
  Text,
  Image,

} from 'react-native';
import CustomButton from '../customButton';
import styles from './ParkItemStyles'
import {IGmapsPlace, ParkItemProps} from "../../Types/DataTypes";
import {GoogleService} from '../../services/GoogleApiServices';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';



function ParkItem (props: ParkItemProps): JSX.Element {
  const {item} = props;

  const navigation: NavigationProp<ParamListBase> = useNavigation()

  const handlePlanVisit = (park: IGmapsPlace) => {
    navigation.navigate('ParkSchedule', {park});
  };

  return (
    <View style={styles.parkItem} testID='park-list'>
      <Text style={styles.parkName}>{item.displayName.text}</Text>
      {item.photos && item.photos.length > 0 && (
        <Image
          style={styles.parkImage}
          source={{uri: GoogleService.getPhoto(item.photos[0].name)}}
        />
      )}
      <Text>{item.shortFormattedAddress}</Text>
      <Text>Rating: {item.rating}</Text>
      <CustomButton
        title="Plan visit 🐾"
        onPress={() =>
          handlePlanVisit(item)
        }
      />
    </View>
  )
};

export default ParkItem
