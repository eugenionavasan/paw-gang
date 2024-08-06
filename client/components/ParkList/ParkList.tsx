
import {
  FlatList,
} from 'react-native';
import {ParklistProps} from '../../types';
import ParkItem from '../ParkItem/ParkItem';

function ParkList (props): JSX.Element {
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
