import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { setActiveUser } from 'redux/slices';
import { User } from 'types';

const useAuth = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(setActiveUser(JSON.parse(user)));
    }
  }, []);

  const updateUser = (newUser: Partial<User>) => {
    dispatch(setActiveUser({ ...user, ...newUser }));
    localStorage.setItem('user', JSON.stringify(user));
  };

  return { user, updateUser };
};

export default useAuth;
