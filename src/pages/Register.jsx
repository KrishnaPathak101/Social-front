import axios from 'axios'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const handleSubmit = async(ev) => {
        ev.preventDefault();
        console.log(name, email, password)
        try {
            axios.post('https://back-social-c7nv.onrender.com/register', { name, email, password })
            console.log('Registered successfully')
            alert('Registered successfully')    
        } catch (error) {
            console.log(error)
        }
        
    }

  return (
    <form onSubmit={handleSubmit} className=' max-w-[600px] mx-auto'>
        <div><h1 className=' mt-5 text-2xl text-center'>Register</h1></div>
        <div className=' flex-col  w-full  mt-10'>
            <h1 className=' pl-2'>Name:</h1>
            <input onChange={(e) => setName(e.target.value)} className=' mt-5 outline-none w-full border rounded-2xl p-2 pl-2  ' type="text" />
        </div>
        <div className=' flex-col  w-full  mt-10'>
            <h1 className=' pl-2'>Email:</h1>
            <input onChange={(e) => setEmail(e.target.value)} className=' mt-5 outline-none w-full border rounded-2xl p-2 pl-2  ' type="text" />
        </div>
        <div className=' flex-col  w-full  mt-10'>
            <h1 className=' pl-2'>Password:</h1>
            <input onChange={(e) => setPassword(e.target.value)} className=' mt-5 outline-none w-full border rounded-2xl p-2 pl-2  ' type="text" />
        </div>
        <div>
            <button className=' w-full bg-blue-500 rounded-2xl p-3 text-xl font-bold text-white mt-10'>Sign Up</button>
        </div>
        <p>Already have an account? <Link to='/account/login'>Login</Link></p>
    </form>
  )
}

export default Register;