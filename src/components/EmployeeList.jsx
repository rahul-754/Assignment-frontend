import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import Spinner from './Spinner'

const EmployeeList = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');

  const navigate = useNavigate();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://assignment-backend-ikzz.onrender.com/api/v1/employees', {
        params: {
          keyword,
          page,
          sort
        }
      });
      console.log(response.data);
       // Log the response data
      if (Array.isArray(response.data.employees)) {
        setEmployees(response.data.employees);
      } else {
        setError(new Error('Response data is not an array'));
      }
      
    } catch (err) {
      setError(err);
      
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, [keyword, page, sort]);

  const handleUpdate = (id) => {
    navigate(`/employee/update/${id}`);
    console.log(`Update employee with id: ${id}`);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://assignment-backend-ikzz.onrender.com/api/v1/delete/${id}`);
      setEmployees(employees.filter(employee => employee._id !== id));
      navigate("/employee")
    } catch (err) {
      console.error('Error deleting employee', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
    fetchEmployees();
  };

  const handleSort = (field) => {
    const sortOrder = sort.startsWith(field) && sort.endsWith('asc') ? `${field},desc` : `${field},asc`;
    setSort(sortOrder);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!Array.isArray(employees)) return <p>Error: Employees data is not valid</p>;

  return (
   <div>

  
    {loading ? <Spinner/> : (
    <div className='w-full flex flex-col items-center'>
      <h1 className='text-2xl font-bold my-4'>Employee List</h1>
      <div className='mb-4'>
        <form onSubmit={handleSearch} className='flex items-center'>
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className='border border-gray-300 rounded-l-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500'
            placeholder='Search employees...'
          />
          <button
            type="submit"
            className='bg-blue-500 text-white py-2 px-4 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Search
          </button>
        </form>
      </div>
      <div className='w-9/12'>
        <table className='w-full bg-white border border-gray-200 rounded-lg shadow-md'>
          <thead>
            <tr className='bg-gray-100 text-left border-b'>
                <th className='py-2 px-4'>ID</th>
              <th className='py-2 px-4 cursor-pointer' onClick={() => handleSort('name')}>Name</th>
              <th className='py-2 px-4 cursor-pointer' onClick={() => handleSort('email')}>Email</th>
              <th className='py-2 px-4'>Mobile</th>
              <th className='py-2 px-4'>Designation</th>
              <th className='py-2 px-4'>Course</th>
              <th className='py-2 px-4 cursor-pointer' onClick={() => handleSort('createdAt')}>Created At</th>
              <th className='py-2 px-4'>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee._id} className='border-b'>
                 <td className='py-2 px-4'>{employee.employeeId}</td>
                <td className='py-2 px-4'>{employee.name}</td>
                <td className='py-2 px-4'>{employee.email}</td>
                <td className='py-2 px-4'>{employee.mobile}</td>
                <td className='py-2 px-4'>{employee.designation}</td>
                <td className='py-2 px-4'>{employee.course}</td>
                <td className='py-2 px-4'>{formatDate(employee.createdAt)}</td>
                <td className='py-2 px-4'>
                  <div className='flex gap-2'>
                    <button
                      onClick={() => handleUpdate(employee._id)}
                      className='bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 border border-blue-500 hover:border-transparent rounded'
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className='bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 border border-red-500 hover:border-transparent rounded'
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-4'>
        <button
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 border border-gray-400 hover:border-transparent rounded mr-2'
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prevPage) => prevPage + 1)}
          className='bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-1 px-3 border border-gray-400 hover:border-transparent rounded'
        >
          Next
        </button>
      </div>
      <div className='mt-10'>
        <button
          onClick={() => navigate("/employee/create")}
          className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'
        >
          Add an Employee
        </button>
      </div>
    </div>
    )} </div>
  );
};

export default EmployeeList;
