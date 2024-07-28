import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen bg-gray-100'>
            <div className='bg-white p-6 rounded-lg shadow-lg text-center'>
                <h1 className='text-3xl font-bold mb-4'>404</h1>
                <p className='text-lg mb-4'>Page Not Found</p>
                <Link to="/dashboard" className='bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600'>
                    Go to Home
                </Link>
            </div>
        </div>
    );
};

export default PageNotFound;
