// Feed.jsx
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Imageshow from '../Components/Imageshow';
import Post from '../Components/Post';
import { Usercontext } from '../Usercontext';
import MessageCompose from '../Components/MessageCompose';
import ChatBox from '../Components/ChatBox';

const Feed = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [text, settext] = useState('')
  const {onlineStatus} = useContext(Usercontext)
  const [usernames, setusernames] = useState([])
  const [recipientId, setRecipientId] = useState(null); // State to hold recipient's ID for messaging
  const [isMessagingModalOpen, setIsMessagingModalOpen] = useState(false);
  const [data, setdata] = useState([])
  const [profilePicture, setProfilePicture] = useState(localStorage.getItem('profilePicture')); // Load profile picture from localStorage

  useEffect(() => {
    // Save profile picture URL to localStorage when profilePicture state changes
    localStorage.setItem('profilePicture', profilePicture);
  }, [profilePicture]);

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
    uploadImages(e.target.files);
  };

  const uploadImages = async (files) => {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }

    try {
      const response = await axios.post('https://back-social-c7nv.onrender.com/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log(response.data);
      const uploadedUrls = response.data.map(image => image.path);
      setImageUrls(prevImageUrls => [...prevImageUrls, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleDelete = (index) => {
    setImageUrls(prevImageUrls => {
      const updatedImageUrls = [...prevImageUrls];
      updatedImageUrls.splice(index, 1);
      return updatedImageUrls;
    });
  };

  const Logout = () => {
    axios.post('https://back-social-c7nv.onrender.com/logout', {}, { withCredentials: true });
    window.location.href = '/';
  }

  const handleProfilePictureChange = (files) => {
    // Assuming only one file is selected for the profile picture
    const file = files[0];
    // Read the selected file as a Data URL
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePicture(reader.result); // Update profile picture state with the Data URL
    };
    reader.readAsDataURL(file);
  };

  const handlePostData = async() => {
    try {
      const response = await axios.post('https://back-social-c7nv.onrender.com/post', { text, imageUrls }, {withCredentials: true});
      alert('Posted Successfully')
      setdata(response)
      window.location.reload('/')
    } catch(e) {
      console.log(e);
    }
  }

  const handleUserName = async() => {
     try {
      const names = await fetch('https://back-social-c7nv.onrender.com/', {credentials: 'include'}).then(res => res.json()).catch(e => console.log(e))
      setusernames(names)
      console.log(usernames)
     } catch (e) {
      console.log(e)
     }
  }

  const handleOpenMessagingInterface = (recipientId) => {
    console.log('Recipient ID:', recipientId); // Log recipientId to check if it's being set correctly
    // Open the messaging interface
    setIsMessagingModalOpen(true);
    setRecipientId(recipientId);
  };
  
  const handleCloseMessagingInterface = () => {
    // Close the messaging interface and set the recipientId
    setIsMessagingModalOpen(false);
    
  };

  return (
    <div className=' max-w-[1025px] mx-auto bg-slate-100 p-5 grid gap-4 grid-cols-[300px_670px]'>
      <div className=' h-[50vh] p-1 pb-1 shadow-md bg-white '>
        <h1 className=' pl-2 text-gray-400'>Navigation</h1>
        <div className=' pl-5 pb-5 p-2 gap-4 mt-5 flex flex-col '>
          <Link className=' hover:text-white p-2 rounded-2xl hover:bg-blue-500  '>Home</Link>
          <Link onClick={handleUserName} className=' hover:text-white p-2 rounded-2xl hover:bg-blue-500  ' >Friends</Link>
          <Link className=' hover:text-white p-2 rounded-2xl hover:bg-blue-500  '>Saved Posts</Link>
          <Link className=' hover:text-white p-2 rounded-2xl hover:bg-blue-500  '>Notifications</Link>
          <Link className=' hover:text-white p-2 rounded-2xl hover:bg-blue-500  ' onClick={Logout}>Logout</Link>
        </div>
        {usernames.length > 0 && (
  <div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-75'>
    <div className='bg-white p-5 rounded-md shadow-md'>
      <button onClick={() => setusernames([])} className='absolute top-5 font-bold right-10 p-2 w-[100px] bg-red-500 text-white mt'>Close</button>
      <p>People You May Know</p>
      <div className='flex justify-center mt-3'>
         {/* Map through usernames and render links to message each user */}
         {usernames.map((username) => (
            <Link key={username._id} onClick={() => handleOpenMessagingInterface(username._id)} className='hover:text-white p-2 rounded-2xl hover:bg-blue-500'>
             
              Message {username.name}
            </Link>
          ))}
      </div>
    </div>
  </div>
)}

          
      </div>
       {/* Render the MessageCompose modal if isMessagingModalOpen is true */}
       {isMessagingModalOpen && recipientId && (
  <ChatBox friendId={recipientId} />
)}
      <div>
      <div className=' shadow-md h-[200px]  p-4 bg-white '>
      <div className='flex gap-3 items-center'>
            {/* Conditional rendering for displaying online status dot */}
            <div className='relative'>
              {profilePicture ? (
                <>
                  <img
                    src={profilePicture}
                    alt='Profile'
                    className='w-[50px] h-[50px] rounded-full overflow-hidden'
                  />
                  {onlineStatus && (
                  <div className='absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white'></div>
                   )}
                </>
              
            ) : (
              <div className='w-[50px] h-[50px] rounded-full bg-gray-500 flex items-center justify-center'>
                <label htmlFor='profile-picture-upload'>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-white cursor-pointer">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                  </svg>
                </label>
                <input
                  type='file'
                  onChange={(e) => handleProfilePictureChange(e.target.files)}
                  accept='image/*'
                  className='hidden'
                  id='profile-picture-upload'
                />
              </div>
            )}
            </div>
            <div className=' w-full'>
            <input onChange={(e) => settext(e.target.value)} type='text' placeholder=' Share Your Thought!' className=' w-full rounded-2xl pl-2  border p-2 ' />
            </div>
          </div>
      {imageUrls && (
        <div className=' relative  ml-4 mt-2 flex gap-2 '>
          {imageUrls.map((imageUrl, index) => (
            <div className=" flex image-container w-[100px] h-[50px] " key={index}>
              <img className=' w-full rounded-xl object-cover' src={`https://back-social-c7nv.onrender.com/${imageUrl}`} alt={`Uploaded Image ${index}`} />
              { (
                <button onClick={() => handleDelete(index)} className=' absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center '>
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className=' justify-between items-center  p-2 flex gap-5'>
          <div className='p-2 items-center gap-5 flex'>
            <div className=' flex '>
              {console.log(onlineStatus)}
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-2 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
              <label htmlFor="file-upload" className="custom-file-upload">
                <span className= " block cursor-pointer">Photos</span>
              </label>
              <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" multiple />
            </div>
            <div className=' flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
         </svg>

          <p>People</p></div>
        <div className=' flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
       <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>

          <p>Check In</p></div>
        <div className=' flex'>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z" />
        </svg>
        <p>
          Mood
        </p>

        </div>
        <div>
          <button onClick={handlePostData} className=' w-[100px] p-2 bg-blue-500 rounded-md text-white font-bold'>Share</button>
        </div>
          </div>
        </div>
        {/* ends here people mood */}
    </div>
    <div className=' w-full shadow-md mt-4'>
        <Post profilePicture={profilePicture} data={data} />
        </div>
      </div>  
        
      </div>
      
    
  );
};

export default Feed;
