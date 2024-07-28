import React, { useState, useEffect } from 'react'
import { Route, Routes } from 'react-router'
import CreateEmployee from './components/CreateEmployee'
import UpdateEmployee from './components/UpdateEmployee'
import EmployeeList from './components/EmployeeList'
import Navbar from './components/Navbar'
import Login from './components/Login'
import PrivateRoute from './components/PrivateRoute'
import PageNotFound from './components/PageNotFound'
import Dashboard from './components/Dashboard'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const savedStatus = localStorage.getItem('isLoggedIn');
    return savedStatus === 'true';
  });

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
  }, [isLoggedIn]);

  return (
    <div>
      <Navbar isloggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <Routes>
        <Route path="/" element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
        <Route path='/employee' element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <EmployeeList />
          </PrivateRoute>

        } />
        <Route path='/employee/create' element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <CreateEmployee />
          </PrivateRoute>
        } />

        <Route path='/employee/update/:id' element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <UpdateEmployee />
          </PrivateRoute>
        } />

        <Route path='/dashboard' element={
          <PrivateRoute isLoggedIn={isLoggedIn}>
            <Dashboard />
          </PrivateRoute>
        } />

        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App