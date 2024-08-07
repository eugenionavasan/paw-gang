import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './ProfileScreenStyles';
import {ProfileScreenNavProp} from '../../Types/DataTypes';


const ProfileScreen: React.FC = () => {
  const navigation = useNavigation<ProfileScreenNavProp>();

  const handleLogout = () => {
    // ^test without replace
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/avatar-Luffy.png')}
        style={styles.image}
      />
      <Text style={styles.text}>User: testuser</Text>
      <Text style={styles.text}>Name: Eugenio</Text>
      <Text style={styles.text}>Dog Name: Luffy</Text>
      <Text style={styles.text}>Email: test@test.com</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
