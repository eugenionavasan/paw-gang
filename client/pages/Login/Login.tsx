import React, { useState } from 'react';
import {
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { handleSignUp } from '../../services/services';
import { RegisterForm } from '../../types';
import { styles } from './LoginStyles'; 

const Login: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [signupForm, setSignupForm] = useState<RegisterForm>({
    email: '',
    password: '',
    username: '',
    dogName: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const isValidEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

  const onSubmitSignUp = async () => {
    if (
      !signupForm.email ||
      !signupForm.password ||
      !signupForm.username ||
      !signupForm.dogName
    ) {
      Alert.alert('All fields are required');
      return;
    }

    if (!isValidEmail(signupForm.email)) {
      Alert.alert('Invalid email address');
      return;
    }

    setLoading(true);
    try {
      const result = await handleSignUp(signupForm);
      console.log('Sign up successful:', result);
      setSignUpSuccess(true);
      setIsSignUp(false);
    } catch (error) {
      console.error('Sign up failed:', error);
      Alert.alert('Sign Up Failed', 'Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  const navigateToAnotherPage = () => {
    navigation.replace('Main');
  };

  const switchToSignUp = () => {
    setIsSignUp(true);
    setSignUpSuccess(false);
  };

  const switchToSignIn = () => {
    setIsSignUp(false);
    setSignUpSuccess(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#cfcec9' }}>
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
            <Text style={{ color: '#008CBA' }}>Paw Gang</Text>
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
                    setSignupForm({ ...signupForm, email })
                  }
                  placeholder="hachiko@example.com"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  value={signupForm.email}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) =>
                    setSignupForm({ ...signupForm, password })
                  }
                  placeholder="********"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={signupForm.password}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Username</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(username) =>
                    setSignupForm({ ...signupForm, username })
                  }
                  placeholder="Your Username"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  value={signupForm.username}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Dog's Name</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(dogName) =>
                    setSignupForm({ ...signupForm, dogName })
                  }
                  placeholder="Your Dog's Name"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  value={signupForm.dogName}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={onSubmitSignUp} disabled={loading}>
                  <View
                    style={[
                      styles.btn,
                      loading && { backgroundColor: '#cccccc' },
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
                  style={{ textDecorationLine: 'underline' }}
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
                  onPress={navigateToAnotherPage}
                  disabled={loading}
                >
                  <View
                    style={[
                      styles.btn,
                      loading && { backgroundColor: '#cccccc' },
                    ]}
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
                  style={{ textDecorationLine: 'underline' }}
                  onPress={switchToSignUp}
                >
                  Sign up
                </Text>
              </Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
