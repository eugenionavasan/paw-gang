import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import  Login  from '../pages/Login'; // Adjust the import path based on your structure
import { handleSignUp } from '../services/services';

// Mock the handleSignUp function
jest.mock('../services/services', () => ({
  handleSignUp: jest.fn(),
}));

describe('Login Component', () => {
  it('renders correctly and allows sign-up', async () => {
    // Mock implementation of handleSignUp
    (handleSignUp as jest.Mock).mockResolvedValue({ success: true });

    const navigation = { replace: jest.fn() };

    // Render the component
    const { getByText, getByPlaceholderText, queryByText } = render(<Login navigation={navigation as any} />);

    // Verify initial state
    expect(getByText('Sign in to Paw Gang')).toBeTruthy();
    expect(queryByText('Sign up')).toBeTruthy();

    // Switch to sign-up mode
    fireEvent.press(getByText('Sign up'));

    // Fill in the sign-up form
    fireEvent.changeText(getByPlaceholderText("Enter your email"), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText("Enter your password"), 'password123');
    fireEvent.changeText(getByPlaceholderText("Enter your username"), 'testuser');
    fireEvent.changeText(getByPlaceholderText("Enter your dog's name"), 'Rex');

    // Submit the form
    fireEvent.press(getByText('Sign up'));

    // Wait for the sign-up to complete
    await waitFor(() => expect(handleSignUp).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
      username: 'testuser',
      dogName: 'Rex',
    }));

    // Check for successful sign-up alert
    expect(getByText('Sign Up Successful')).toBeTruthy();
  });

  it('renders sign-in mode and navigates to main', () => {
    const navigation = { replace: jest.fn() };

    // Render the component
    const { getByText } = render(<Login navigation={navigation as any} />);

    // Verify initial state
    expect(getByText('Sign in to Paw Gang')).toBeTruthy();
    expect(getByText('Sign up')).toBeTruthy();

    // Switch to sign-in mode
    fireEvent.press(getByText('Sign in'));

    // Verify that the sign-in button is visible
    expect(getByText('Sign in')).toBeTruthy();

    // Submit the sign-in form
    fireEvent.press(getByText('Sign in'));

    // Check that navigation to 'Main' was called
    expect(navigation.replace).toHaveBeenCalledWith('Main');
  });

  // Additional tests for edge cases and error handling can be added here
});
