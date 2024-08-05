// services.ts
import { SERVER_URL, SERVER_PORT } from '../config';
import { LoginForm } from '../types';

const LOGIN_URL = `${SERVER_URL}:${SERVER_PORT}/`;

export const handleSignIn = async (form: LoginForm): Promise<any> => {
  try {
    const response = await fetch(LOGIN_URL, {
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
    console.error('Error during sign-in:', error);
    throw error;
  }
};
