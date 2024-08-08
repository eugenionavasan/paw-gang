
import {
  FlatList,
} from 'react-native';
import ParkItem from '../ParkItem/ParkItem';
import {ParklistProps} from '../../Types/PropTypes';

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
