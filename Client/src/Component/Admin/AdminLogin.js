
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginSuccess } from '../../Redux/userSlice';
import axiosInstance from '../../Utils/Axios';
import '../Style/adminLogin.css'


const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post('admin/', {
        email,
        password,
      });

      const userData = response.data;
      console.log(userData);

      if (userData.token) {
        if (userData.isAdmin) {
          localStorage.setItem('jwt', JSON.stringify(userData.token));

          dispatch(loginSuccess({ token: userData.token, isAdmin: userData.isAdmin }));
          navigate('/users');
        } else {
          setError('Unauthorized - Not an admin');
        }
      } else {
        setError('Unauthorized - Invalid credentials');
      }
    } catch (error) {
      setError('Login failed. Please try again.'); 
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div className="container mt-5">
    <h2 className="h2">Admin Login</h2>
    <form className="form">
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          className="input"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      {error && <div className="error-message">{error}</div>}
      <button className="button" type="button" onClick={handleLogin}>
        Login
      </button>
    </form>
  </div>
  );
};

export default AdminLogin;
