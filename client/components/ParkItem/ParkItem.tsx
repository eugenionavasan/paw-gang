import {
  View,
  Text,
  Image,

} from 'react-native';
import CustomButton from '../customButton';
import styles from './ParkItemStyles'
import {IPark, ParkItemProps} from "../../types";
import {GoogleService} from '../../services/GoogleApiServices';
import {NavigationProp, ParamListBase, useNavigation} from '@react-navigation/native';



function ParkItem (props: ParkItemProps): JSX.Element {
  const {item} = props;

  const navigation: NavigationProp<ParamListBase> = useNavigation()

  const handlePlanVisit = (park: IPark) => {
    navigation.navigate('ParkSchedule', {place_id: park.place_id, name: park.name, vicinity: park.vicinity});
  };

  return (
    <View style={styles.parkItem}>
      <Text style={styles.parkName}>{item.name}</Text>
      {item.photos && item.photos.length > 0 && (
        <Image
          style={styles.parkImage}
          source={{uri: GoogleService.getPhoto(item.photos[0].photo_reference)}}
        />
      )}
      <Text>{item.vicinity}</Text>
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
