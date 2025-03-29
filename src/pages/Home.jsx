// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-purple-200 to-purple-400 p-6 text-gray-900">
    <div className="text-center">
        <h1 className="text-7xl font-bold mb-6 text-purple-800 drop-shadow-lg ">
            Welcome to the GPA Calculator
        </h1>
        <p className="text-2xl text-gray-700 mb-12 animate-pulse">
            Upload your screenshot to calculate your CGPA instantly.
        </p>
        <Link 
            to="/upload" 
            className="bg-purple-600 text-white py-4 px-10 rounded-full text-2xl font-semibold shadow-md hover:bg-purple-700 transition-all transform hover:scale-105"
        >
            Upload Your Screenshot
        </Link>
    </div>

    {/* Footer fixed at the bottom */}
    <footer className="absolute bottom-4 text-gray-700 text-lg font-medium text-center w-full">
        &copy; {new Date().getFullYear()} <span className="text-purple-800 font-bold">GPA Calculator</span>
        <br />
        <span className="text-purple-900 font-semibold text-sm">Crafted with 💚 by Vaseem</span>
    </footer>
</div>

    

    );
};

export default Home;
