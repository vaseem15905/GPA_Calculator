// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 p-6">
            <h1 className="text-4xl font-semibold mb-4">Welcome to the GPA Calculator</h1>
            <p className="text-xl mb-6">Upload your screenshot to calculate your CGPA instantly.</p>
            <Link 
                to="/upload" 
                className="bg-blue-500 text-white py-3 px-6 rounded-lg text-xl hover:bg-blue-600 transition-all"
            >
                Upload Your Screenshot
            </Link>
        </div>
    );
};

export default Home;
