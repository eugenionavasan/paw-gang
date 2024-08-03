import { useState, useEffect } from 'react';
import { SERVER_PORT, LOCAL_IP_ADDRESS } from '../config';
import axios from 'axios';
import { Config } from '../types';

const useConfig = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await axios.get(`http://${LOCAL_IP_ADDRESS}:${SERVER_PORT}/api/config`);
        setConfig(response.data);
      } catch (error) {
        console.error('Error fetching configuration:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  return { config, loading };
};

export default useConfig;