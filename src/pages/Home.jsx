import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Usercontext } from '../Usercontext';
import Feed from './Feed';

const HomePage = () => {
  const {user} = useContext(Usercontext);

  return (
    <>
    {
      user ? <Feed/> : <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Come, let's explore</h1>
      <div>
        <Link to="/account/login" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md mr-4">
          Login
        </Link>
        <Link to="/account/register" className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-md">
          Register
        </Link>
      </div>
    </div>
    }
    </>
  );
};

export default HomePage;
