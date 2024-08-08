import React, {useState} from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {handleSignUp, isValidSignUp} from '../../services/UtilServices';
import {RegisterForm} from '../../Types/DataTypes';
import {styles} from './LoginStyles';
import {isValidEmail} from '../../services/UtilServices';

const Login: React.FC<{navigation: any}> = ({navigation}) => {
  const [formData, setFormData] = useState<RegisterForm>({
    email: '',
    password: '',
    username: '',
    dogName: '',
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [signUpSuccess, setSignUpSuccess] = useState<boolean>(false);

  const onSignUp = async (): Promise<void> => {
    try {
      if (isValidSignUp(formData) && isValidEmail(formData.email)) {
        setLoading(true);
        const result = await handleSignUp(formData);
        if (result) {
          setSignUpSuccess(true);
          setIsSignUp(false);
          navigation.replace('Main');
        }
      }
    } catch (error) {
      console.error('Sign up failed:', error);
      Alert.alert('Sign Up Failed', 'Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const switchToSignUp = (): void => {
    setIsSignUp(true);
    setSignUpSuccess(false);
  };

  const switchToSignIn = (): void => {
    setIsSignUp(false);
    setSignUpSuccess(false);
  };

  function onSignIn () {
    navigation.replace('Main')
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#cfcec9'}}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('../../assets/logo.jpg')}
          />
          <Text style={styles.title}>
            {isSignUp ? 'Sign up to' : 'Sign in to'}{' '}
            <Text style={{color: '#008CBA'}}>Paw Gang</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get your dog's tail wagging with a playdate!
          </Text>
        </View>

        <View style={styles.form}>
          {signUpSuccess ? (
            <Text style={styles.successMessage}>Sign Up Successful</Text>
          ) :
          <>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email address</Text>
              <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                onChangeText={(email) =>
                  setFormData({...formData, email})
                }
                placeholder="hachiko@example.com"
                placeholderTextColor="grey"
                style={styles.inputControl}
                value={formData.email}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>
              <TextInput
                autoCorrect={false}
                clearButtonMode="while-editing"
                onChangeText={(password) =>
                  setFormData({...formData, password})
                }
                placeholder="********"
                placeholderTextColor="grey"
                style={styles.inputControl}
                secureTextEntry={true}
                value={formData.password}
              />
            </View>
              {
                isSignUp &&
                <>
                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput
                      autoCorrect={false}
                      clearButtonMode="while-editing"

                      onChangeText={(username) =>
                        setFormData({...formData, username})
                      }
                      placeholder="Your Username"
                      placeholderTextColor="grey"
                      style={styles.inputControl}
                      value={formData.username}
                    />
                  </View>

                  <View style={styles.input}>
                    <Text style={styles.inputLabel}>Dog's Name</Text>
                    <TextInput
                      autoCorrect={false}
                      clearButtonMode="while-editing"
                      onChangeText={(dogName) =>
                        setFormData({...formData, dogName})
                      }
                      placeholder="Your Dog's Name"
                      placeholderTextColor="grey"
                      style={styles.inputControl}
                      value={formData.dogName}
                    />
                  </View>
                </>
              }
                <View style={styles.formAction}>
                  <TouchableOpacity onPress={isSignUp ? onSignUp : onSignIn} disabled={loading}>
                    <View
                      style={[
                        styles.btn,
                        loading && {backgroundColor: '#cccccc'},
                      ]}
                    >
                      <Text
                        style={styles.btnText}
                      testID={isSignUp ? 'sign-up' : 'sign-in'}>
                      {loading && (isSignUp ? 'Signing up...' : 'Navigating...')}
                      {!loading && (isSignUp ? 'Sign up' : 'Sign in')}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </>
            }
            {!isSignUp && <Text style={styles.formLink}>Forgot password?</Text>}
            <Text style={styles.formLink}>
              {(isSignUp && !loading) && `Already have an account? `}
              {(!isSignUp && !loading) && `Don't have an account? `}
              <Text
                style={{textDecorationLine: 'underline'}}
                onPress={isSignUp ? switchToSignIn : switchToSignUp}
              >
              {isSignUp ? `Sign in` : `Sign up`}
              </Text>
            </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;


{/* <View style={styles.container}>
  <View style={styles.header}>
    <Image
      alt="App Logo"
      resizeMode="contain"
      style={styles.headerImg}
      source={require('../../assets/logo.jpg')}
    />
    <Text style={styles.title}>
      {isSignUp ? 'Sign up to' : 'Sign in to'}{' '}
      <Text style={{color: '#008CBA'}}>Paw Gang</Text>
    </Text>
    <Text style={styles.subtitle}>
      Get your dog's tail wagging with a playdate!
    </Text>
  </View>

  <View style={styles.form}>
    {signUpSuccess ? (
      <Text style={styles.successMessage}>Sign Up Successful</Text>
    ) : isSignUp ? (
      <>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email address</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            onChangeText={(email) =>
              setFormData({...formData, email})
            }
            placeholder="hachiko@example.com"
            placeholderTextColor="grey"
            style={styles.inputControl}
            value={formData.email}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(password) =>
              setFormData({...formData, password})
            }
            placeholder="********"
            placeholderTextColor="grey"
            style={styles.inputControl}
            secureTextEntry={true}
            value={formData.password}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Username</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(username) =>
              setFormData({...formData, username})
            }
            placeholder="Your Username"
            placeholderTextColor="grey"
            style={styles.inputControl}
            value={formData.username}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Dog's Name</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            onChangeText={(dogName) =>
              setFormData({...formData, dogName})
            }
            placeholder="Your Dog's Name"
            placeholderTextColor="grey"
            style={styles.inputControl}
            value={formData.dogName}
          />
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity onPress={onSignUp} disabled={loading}>
            <View
              style={[
                styles.btn,
                loading && {backgroundColor: '#cccccc'},
              ]}
            >
              <Text style={styles.btnText}>
                {loading ? 'Signing up...' : 'Sign up'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.formLink}>
          Already have an account?{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={switchToSignIn}
          >
            Sign in
          </Text>
        </Text>
      </>
    ) : (
      <>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email address</Text>
          <TextInput
            autoCapitalize="none"
            autoCorrect={false}
            clearButtonMode="while-editing"
            keyboardType="email-address"
            placeholder="hachiko@example.com"
            placeholderTextColor="grey"
            style={styles.inputControl}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>
          <TextInput
            autoCorrect={false}
            clearButtonMode="while-editing"
            placeholder="********"
            placeholderTextColor="grey"
            style={styles.inputControl}
            secureTextEntry={true}
          />
        </View>

        <View style={styles.formAction}>
          <TouchableOpacity
            onPress={() => {
              // Handle sign-in logic here if necessary
              navigation.replace('Main'); // Direct navigation for sign-in
            }}
            disabled={loading}
          >
            <View
              style={[
                styles.btn,
                loading && {backgroundColor: '#cccccc'},
              ]}
              testID='sign-in'
            >
              <Text style={styles.btnText}>
                {loading ? 'Navigating...' : 'Sign in'}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Text style={styles.formLink}>Forgot password?</Text>
        <Text style={styles.formLink}>
          Don't have an account?{' '}
          <Text
            style={{textDecorationLine: 'underline'}}
            onPress={switchToSignUp}
          >
            Sign up
          </Text>
        </Text>
      </>
    )}
  </View>
</View>
 */}
