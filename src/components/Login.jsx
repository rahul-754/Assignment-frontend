import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Login = ({ setIsLoggedIn }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const user = import.meta.env.VITE_APP_USERNAME;
  const pass = import.meta.env.VITE_APP_PASSWORD;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (username === user && password === pass) {
      setIsLoggedIn(true);
      navigate("/dashboard")
    } else {
      alert("Please enter valid username and password")
    }

  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-6 rounded-lg shadow-lg w-96'>
        <h1 className='text-2xl font-bold mb-4'>Login</h1>

        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label className='block text-gray-700'>Username <sup>*</sup></label>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
              placeholder='Username'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700'>Password <sup>*</sup></label>
            <input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded mt-1'
              placeholder='Password'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
