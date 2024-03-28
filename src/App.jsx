import React, { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import Header from './Components/Header';
import { Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import io from 'socket.io-client';
import Login from './pages/Login';
import UsercontextProvider from './Usercontext';
import Home from './pages/Home';
const socket = io('https://back-social-c7nv.onrender.com');

function App() {


  useEffect(() => {
    // Establish Socket.io connection when component mounts

    
    
    socket.on("welconme", (data) => {
      console.log(data);
    });   
 

    
  }, []);

  return (
    <>
      <UsercontextProvider>
        <Header />
        <Routes>
          <Route path='/' element={<Home socket={socket} />} /> {/* Pass socket instance as prop to Home component */}
          <Route path='/account/register' element={<Register />} />
          <Route path='/account/login' element={<Login />} />
        </Routes>
      </UsercontextProvider>
    </>
  );
}

export default App;
