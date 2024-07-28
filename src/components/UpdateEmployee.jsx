import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const UpdateEmployee = () => {

  const navigate = useNavigate();
  const { id } = useParams(); // Get employee ID from URL
  const [employee, setEmployee] = useState({
    name: '',
    email: '',
    mobile: '',
    designation: '',
    gender: '',
    course: ''
  });

  useEffect(() => {
    // Fetch employee details by ID when component mounts
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`https://assignment-backend-ikzz.onrender.com/api/v1/employees/${id}`);
        setEmployee(response.data);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployee();
  }, [id]);

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`https://assignment-backend-ikzz.onrender.com/api/v1/update/${id}`, employee);
      console.log('Employee updated:', response.data);
      const output = response.data;
     
      navigate("/employee")

    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const courseOptions = ['MBA','BCA','BSC'];

  return (
    <div className='flex flex-col items-center h-[100vh] justify-center'>
  <h1 className='text-2xl font-bold mb-4'>Update Employee</h1>
  <form onSubmit={handleUpdate} className='w-full max-w-md bg-white p-6 border border-gray-200 rounded-lg shadow-md'>
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
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="QA Engineer">QA Engineer</option>
            <option value="HR Specialist">HR Specialist</option>
            {/* Add more options as needed */}
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
            <div>
              <input
                type="radio"
                id="gender-other"
                name="gender"
                value="Other"
                checked={employee.gender === 'Other'}
                onChange={handleChange}
                className='mr-2'
              />
              <label htmlFor="gender-other" className='text-sm'>Other</label>
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

        <input
      type="file"
      name="profile"
      id="profile"
      onChange={handleChange}
      className='py-2'
    />
        <button type="submit" className='w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md hover:border-transparent'>
          Submit
        </button>
  </form>
</div>

  );
};

export default UpdateEmployee;
