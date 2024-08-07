
import {
  FlatList,
} from 'react-native';
import {ParklistProps} from '../../Types/DataTypes';
import ParkItem from '../ParkItem/ParkItem';

function ParkList (props: ParklistProps): JSX.Element {
  const {dogParks} = props
  return (
    <FlatList
      data={dogParks}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <ParkItem item={item} />}
    />
  )
}

export default ParkList;
