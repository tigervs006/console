import { useState, useCallback } from 'react';

export default () => {
  const prefix: string = '/console';
  const [accessToken, setAccessToken] = useState<string>('Bearer ');
  // pre事实上是useState的默认值'Bearer '
  const getAccessToken = useCallback((pre) => setAccessToken((val) => pre + val), []);
  return {
    prefix,
    accessToken,
    getAccessToken,
  };
};
