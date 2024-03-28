import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { Usercontext } from '../Usercontext'

const Header = () => {
  const {user} = useContext(Usercontext)

  return (
    <div className=' items-center flex justify-between mx-auto max-w-[1025px] bg-blue-500 p-3 '>
        <Link to='/'>
            <h1 className=' text font-bold text-white text-xl'>Social Society</h1>
            </Link>
        <div>
            <input placeholder=' Your friends might be here' className=' w-[400px] p-2 rounded-2xl outline-none ' type="text" />
        </div>
        <Link to='/account/register' className=' items-center gap-5 flex '>
            <h1>{!user ? 'Log In': user.name}</h1>
            <div className=' w-[30px] h-[30px] rounded-full bg-gray-500'>

            </div>
        </Link>
    </div>
  )
}

export default Header