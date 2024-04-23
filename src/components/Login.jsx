import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'password') {
      onLogin();
      alert('Login successfully');
      navigate('/dashboard');
    } else {
      alert('Invalid credentials, Please use admin as username and password as password');
    }
  };

  return (
    <form className='login-container' onSubmit={handleLogin}>
      <h2>Login</h2>
      <div className='login-input-container'>
        <label htmlFor='username'>Username:</label>
        &nbsp;
        <input
          type='text'
          id='username'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className='login-input-field'
        />
      </div>
      <div className='login-input-container'>
        <label htmlFor='password'>Password:</label>
        &nbsp;
        <input
          type='password'
          id='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='login-input-field'
        />
      </div>
      <button type='submit' className='login-button'>
        Login
      </button>
    </form>
  );
};

export default Login;
