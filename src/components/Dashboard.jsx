import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router';
import Spinner from './Spinner'

function Dashboard() {

    const navigate = useNavigate();
    const [emp, setEmp] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchEmployees = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://assignment-backend-ikzz.onrender.com/api/v1/getAllEmployees');
            console.log(response.data);
            setEmp(response.data);

            console.log("this is page:")

        } catch (err) {
            console.error("Error fetching employees:", err);
        }
        setLoading(false)
    };
    useEffect(() => {
        fetchEmployees();
    }, []);

    return (

        <div>
                {loading ? <Spinner/> : (
        <div className='h-[100vh] flex flex-col justify-center bg-gradient-to-r from-blue-500 to-green-500 text-white'>
            <div className='w-full flex justify-center'>
                <div className=" w-9/12 flex flex-col justify-center items-center">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold mb-4">Welcome to the Dashboard</h1>
                    </div>
                    <div className='flex gap-6'>

                        <div className="bg-white text-black mb-3 p-6 rounded-lg shadow-lg max-w-xs w-full text-center">
                            <h2 className="text-2xl font-bold mb-2">Total Employees</h2>
                            <p className="text-7xl pt-5">{emp.length}</p>
                        </div>

                        {/* Total employees course wise */}
                        <div className="bg-white text-black mb-3 p-6 rounded-lg shadow-lg max-w-xs w-full">
                            <h1 className="text-center text-2xl font-bold mb-4">Course-Wise Employees</h1>
                            <div className='flex w-full justify-between text-center'>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">BSC</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.course.includes('BSC')).length}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">MBA</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.course.includes('MBA')).length}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">BCA</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.course.includes('BCA')).length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Employees desigantion wise */}

                        <div className="bg-white text-black mb-3 p-6 rounded-lg shadow-lg max-w-xs w-full">
                            <h1 className="text-center text-2xl font-bold mb-4">Designation-Wise Employees</h1>
                            <div className='flex w-full justify-between text-center'>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">HR</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.designation.includes('HR')).length}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">Manager</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.designation.includes('Manager')).length}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">Sales</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.designation.includes('Sales')).length}</p>
                                </div>
                            </div>
                        </div>

                        {/* Gender wise employees */}
                        <div className="bg-white text-black mb-3 p-6 rounded-lg shadow-lg max-w-xs w-full">
                            <h1 className="text-center text-2xl font-bold mb-4">Gender-Wise Employees</h1>
                            <div className='flex w-full justify-between text-center'>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">Female</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.gender.includes('Female')).length}</p>
                                </div>
                                <div className="mb-4">
                                    <h2 className="text-xl font-semibold mb-1">Male</h2>
                                    <p className="text-2xl">{emp.filter(employee => employee.gender.includes('Male')).length}</p>
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
                
            </div>
            <button
            onClick={() => navigate('/employee')}
             className='w-[300px]  items-center mx-auto mt-10 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 border border-blue-500 rounded-md hover:border-transparent'>
                    Go to Employee page
                </button>
        </div>
        )}

        </div>
    )
}

export default Dashboard
