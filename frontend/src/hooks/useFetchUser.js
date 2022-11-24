import { useState, useEffect, useCallback } from 'react';

export const useFetchUser = () => {
  const [user, setUser] = useState(null);

  const getUser = () => {
    // const fetchedUser =  localStorage.getItem('user') !== 'undefined'
    //   ? JSON.parse(localStorage.getItem('user'))
    //   : localStorage.clear();

    const fetchedUser = JSON.parse(localStorage.getItem('user'));

      setUser(fetchedUser);
  };

  useEffect(() => {
    getUser();
  }, []);

  return user;
}