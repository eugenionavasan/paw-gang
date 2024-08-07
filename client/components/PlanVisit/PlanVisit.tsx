import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {
  Alert,
  Button,
  FlatList,
  Image,
  Modal,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const PlanVisit = (): JSX.Element => {
  return (
    <>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Plan your visit 🐶</Text>
        <TouchableOpacity onPress={showTimePicker} style={styles.input}>
          <Text
            style={newEventDate ? styles.inputText : styles.placeholderText}
          >
            {newEventDate || 'Start Time (HH:00)'}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={isTimePickerVisible}
          mode="time"
          onConfirm={handleConfirm}
          onCancel={hideTimePicker}
          minuteInterval={30}
        />
        <View style={styles.modalButtons}>
          <Button title="Cancel" onPress={() => setModalVisible(false)} />
          <Button title="Save" onPress={handleSaveEvent} />
        </View>
      </View>
    </>
  )
}
