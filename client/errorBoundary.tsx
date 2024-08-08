/* eslint-disable no-console */
/* eslint-disable react-native/no-color-literals */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-unused-vars */
import {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {ErrorBoundaryProps, ErrorBoundaryState} from './Types/DataTypes';

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {hasError: false};
  }

  static getDerivedStateFromError (error: Error): ErrorBoundaryState {
    return {hasError: true};
  }

  componentDidCatch (error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error', error, errorInfo);
  }

  render () {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <Text style={styles.errorText}>Something went wrong.</Text>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default ErrorBoundary;
