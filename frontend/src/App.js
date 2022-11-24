import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {Login, SignUp} from './components';
import Home from './container/Home';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) navigate('/login');
  }, []);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route path='sign-up' element={<SignUp />} />
      <Route path='/*' element={<Home />} />
    </Routes>
  );
}

export default App;
