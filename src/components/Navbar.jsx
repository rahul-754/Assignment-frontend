import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({isloggedIn,setIsLoggedIn}) => {
  const navigate = useNavigate();
  
  function logoutHandler(){
    setIsLoggedIn(false)
    navigate("/")
  }
  return (
    <nav className='w-full bg-gray-800 border-b border-gray-700 py-3 fixed'>
  <div className='flex justify-between items-center mx-auto w-9/12'>
    <Link to="/dashboard" className='text-white text-lg font-semibold hover:text-gray-300'>
      Home
    </Link>
    {
      isloggedIn ? <button  onClick={logoutHandler} className='text-white font-bold'>Logout</button>:
      <Link to="/" className='text-white text-lg font-semibold hover:text-gray-300'>
      Login
    </Link>
    }
    
  </div>
</nav>

  );
};

export default Navbar;
