import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('')
  
 const handleLogin = async(ev) => {
     ev.preventDefault();
     try{
         axios.post('https://back-social-c7nv.onrender.com/login', { email, password }, {withCredentials: true})
         console.log('Logged in successfully')
         alert('Logged in successfully')
         window.location.href = '/'
     } catch(error){
         console.log(error)
         alert('Invalid email or password')
     }
 }

 

  return (
    <form onSubmit={handleLogin} className=' max-w-[600px] mx-auto'>
        <div><h1 className=' mt-5 text-2xl text-center'>Log In</h1></div>
        <div className=' flex-col  w-full  mt-10'>
            <h1 className=' pl-2'>Email:</h1>
            <input onChange={(e) => setEmail(e.target.value)} className=' mt-5 outline-none w-full border rounded-2xl p-2 pl-2  ' type="text" />
        </div>
        <div className=' flex-col  w-full  mt-10'>
            <h1 className=' pl-2'>Password:</h1>
            <input onChange={(e) => setPassword(e.target.value)} className=' mt-5 outline-none w-full border rounded-2xl p-2 pl-2  ' type="text" />
        </div>
        <div>
            <button className=' w-full bg-blue-500 rounded-2xl p-3 text-xl font-bold text-white mt-10'>Sign In</button>
        </div>
        <p>Don't have an account? <Link to='/account/register'>Register</Link></p>
    </form>
    
  )
}

export default Login