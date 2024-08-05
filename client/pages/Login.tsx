import React, { useState } from 'react';
import {
  StyleSheet,
  SafeAreaView,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import { RegisterForm, LoginForm, LoginScreenNavigationProp } from '../types';
import { handleSignUp, handleSignIn } from '../services/services';

interface Props {
  navigation: LoginScreenNavigationProp;
}

const Login: React.FC<Props> = ({ navigation }) => {
  const [form, setForm] = useState<LoginForm>({
    email: '',
    password: '',
  });
  const [signupForm, setSignupForm] = useState<RegisterForm>({
    email: '',
    password: '',
    username: '',
    dogName: '',
  });
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const onSubmitLogin = async () => {
    setLoading(true);
    try {
      const result = await handleSignIn(form);
      console.log('Login successful:', result);
      navigation.replace('Profile');
    } catch (error) {
      console.error('Login failed:', error);
      Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onSubmitSignUp = async () => {
    setLoading(true);
    try {
      const result = await handleSignUp(signupForm);
      console.log('Sign up successful:', result);
      setIsSignUp(false);
      Alert.alert('Sign Up Successful', 'You can now log in.');
    } catch (error) {
      console.error('Sign up failed:', error);
      Alert.alert('Sign Up Failed', 'Please check your details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#cfcec9' }}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Image
            alt="App Logo"
            resizeMode="contain"
            style={styles.headerImg}
            source={require('../assets/logo.jpg')}
          />
          <Text style={styles.title}>
            {isSignUp ? 'Sign up to' : 'Sign in to'} <Text style={{ color: '#008CBA' }}>Paw Gang</Text>
          </Text>
          <Text style={styles.subtitle}>
            Get your dog's tail wagging with a playdate!
          </Text>
        </View>

        <View style={styles.form}>
          {isSignUp ? (
            <>
              <View style={styles.input}>
                <Text style={styles.inputLabel}>Email address</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  keyboardType="email-address"
                  onChangeText={(email) => setSignupForm({ ...signupForm, email })}
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
                  onChangeText={(password) => setSignupForm({ ...signupForm, password })}
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
                  onChangeText={(username) => setSignupForm({ ...signupForm, username })}
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
                  onChangeText={(dogName) => setSignupForm({ ...signupForm, dogName })}
                  placeholder="Your Dog's Name"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  value={signupForm.dogName}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={onSubmitSignUp} disabled={loading}>
                  <View style={[styles.btn, loading && { backgroundColor: '#cccccc' }]}>
                    <Text style={styles.btnText}>{loading ? 'Signing up...' : 'Sign up'}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.formLink}>Already have an account? <Text style={{ textDecorationLine: 'underline' }} onPress={() => setIsSignUp(false)}>Sign in</Text></Text>
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
                  onChangeText={(email) => setForm({ ...form, email })}
                  placeholder="hachiko@example.com"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  value={form.email}
                />
              </View>

              <View style={styles.input}>
                <Text style={styles.inputLabel}>Password</Text>
                <TextInput
                  autoCorrect={false}
                  clearButtonMode="while-editing"
                  onChangeText={(password) => setForm({ ...form, password })}
                  placeholder="********"
                  placeholderTextColor="grey"
                  style={styles.inputControl}
                  secureTextEntry={true}
                  value={form.password}
                />
              </View>

              <View style={styles.formAction}>
                <TouchableOpacity onPress={onSubmitLogin} disabled={loading}>
                  <View style={[styles.btn, loading && { backgroundColor: '#cccccc' }]}>
                    <Text style={styles.btnText}>{loading ? 'Signing in...' : 'Sign in'}</Text>
                  </View>
                </TouchableOpacity>
              </View>

              <Text style={styles.formLink}>Forgot password?</Text>
              <Text style={styles.formLink}>Don't have an account? <Text style={{ textDecorationLine: 'underline' }} onPress={() => setIsSignUp(true)}>Sign up</Text></Text>
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#cfcec9',
    paddingVertical: 24,
    paddingHorizontal: 0,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 31,
    fontWeight: '700',
    color: 'black',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 36,
  },
  headerImg: {
    backgroundColor: '#cfcec9',
    width: 400,
    height: 200,
    alignSelf: 'center',
    marginBottom: 36,
  },
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formLink: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
  },
  formFooter: {
    fontSize: 15,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    letterSpacing: 0.15,
  },
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontWeight: '600',
    color: 'black',
    marginBottom: 8,
  },
  inputControl: {
    height: 50,
    backgroundColor: '#cfcec9',
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: '500',
    color: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    backgroundColor: '#008CBA',
    borderColor: '#008CBA',
  },
  btnText: {
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Login;
