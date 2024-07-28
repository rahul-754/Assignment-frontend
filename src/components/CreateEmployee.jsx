import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const CreateEmployee = () => {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: [],
    image:'',
  });
  const [errors, setErrors] = useState({
    email: ''
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name === 'email') {
      if (!validateEmail(value)) {
        setErrors({ ...errors, email: 'Invalid email format' });
      } else {
        setErrors({ ...errors, email: '' });
      }
    }
    if (type === 'checkbox') {
      if (checked) {
        setEmployee((prevState) => ({
          ...prevState,
          course: [...prevState.course, value]
        }));
      } else {
        setEmployee((prevState) => ({
          ...prevState,
          course: prevState.course.filter((course) => course !== value)
        }));
      }
    } else {
      setEmployee({
        ...employee,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.email) {
      alert("Please correct the errors before submitting.");
      return;
    }
    try {
      const response = await axios.post('https://assignment-backend-ikzz.onrender.com/api/v1/create', employee);
     
      navigate('/employee');
    } catch (error) {
      // console.error('There was an error!', error);
      alert("Email already exists.");
    }
  };

  const courseOptions = ['MBA', 'BCA', 'BSC'];

  return (
    <div className='flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6'>
      <h1 className='text-2xl font-bold mb-4'>Create Employee</h1>
      <form onSubmit={handleSubmit} className='w-full max-w-md bg-white p-8 border border-gray-200 rounded-lg shadow-md'>
        <div className='mb-2'>
          <label htmlFor="name" className='block text-sm font-medium mb-1'>Name:</label>
          <input
            type="text"
            name="name"
            id="name"
            value={employee.name}
            onChange={handleChange}
            placeholder="Name"
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="email" className='block text-sm font-medium mb-1'>Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            value={employee.email}
            onChange={handleChange}
            placeholder="Email"
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
          {errors.email && <p className='text-red-500 text-xs mt-1'>{errors.email}</p>}
        </div>
        <div className='mb-2'>
          <label htmlFor="mobile" className='block text-sm font-medium mb-1'>Mobile:</label>
          <input
            type="text"
            name="mobile"
            id="mobile"
            value={employee.mobile}
            onChange={handleChange}
            placeholder="Mobile"
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          />
        </div>
        <div className='mb-2'>
          <label htmlFor="designation" className='block text-sm font-medium mb-1'>Designation:</label>
          <select
            name="designation"
            id="designation"
            value={employee.designation}
            onChange={handleChange}
            className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            required
          >
            <option value="">Select Designation</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
            <option value="HR">HR</option>
          </select>
        </div>
        <div className='mb-2'>
          <label htmlFor="gender" className='block text-sm font-medium mb-1'>Gender:</label>
          <div className='flex items-center space-x-4'>
            <div>
              <input
                type="radio"
                id="gender-male"
                name="gender"
                value="Male"
                checked={employee.gender === 'Male'}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor="gender-male" className='text-sm'>Male</label>
            </div>
            <div>
              <input
                type="radio"
                id="gender-female"
                name="gender"
                value="Female"
                checked={employee.gender === 'Female'}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor="gender-female" className='text-sm'>Female</label>
            </div>
           
          </div>
        </div>
        <div className='mb-2'>
          <label htmlFor="course" className='block text-sm font-medium mb-1'>Course:</label>
          <div className='flex flex-col space-y-2'>
            {courseOptions.map((course) => (
              <div key={course} className='flex items-center'>
                <input
                  type="checkbox"
                  id={`course-${course}`}
                  name="course"
                  value={course}
                  checked={employee.course.includes(course)}
                  onChange={handleChange}
                  className='mr-2'
                />
                <label htmlFor={`course-${course}`} className='text-sm'>{course}</label>
              </div>
            ))}
          </div>
        </div>
        <div className='mb-2'>
          <label htmlFor="image" className='block text-sm font-medium mb-1'>Upload Image:</label>
          <input
            type="file"
            name="image"
            id="image"
            onChange={(e)=>setEmployee({...employee, image: e.target.files[0]})}
            className='w-full py-2'
          />
        </div>
        <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md hover:border-transparent'>
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateEmployee;
