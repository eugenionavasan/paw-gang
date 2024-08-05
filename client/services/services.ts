import { LOCAL_IP_ADDRESS, SERVER_PORT } from '../config';
import { LoginForm } from '../types';

const SIGNUP_URL = `${LOCAL_IP_ADDRESS}:${SERVER_PORT}/users`;

export const handleSignUp = async (form: LoginForm): Promise<any> => {
  try {
    const response = await fetch(SIGNUP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error during sign-up:', error);
    throw error;
  }
};