import React, { useContext, useEffect, useState } from 'react';
import { Usercontext } from '../Usercontext';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Post = ({ data, profilePicture }) => {
  const { user } = useContext(Usercontext);
  const [postdata, setPostData] = useState([]);
  const [deletePopupVisible, setDeletePopupVisible] = useState(false); // State to manage delete popup visibility
  const [postIdToDelete, setPostIdToDelete] = useState(null); // State to store the ID of the post to delete
  const [showDropdownId, setShowDropdownId] = useState(null); // State to manage the ID of the post for which the dropdown is shown
  const [Likes, setLikes] = useState(0);
  const [text, settext] = useState('')
  const [Comments, setComments] = useState('');
  const [Share , setShare] = useState(0);
  const { onlineStatus } = useContext(Usercontext);


  useEffect(() => {
    fetch('https://back-social-c7nv.onrender.com/post', { credentials: 'include' })
      .then((res) => res.json())
      .then((res) => setPostData(res))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    // Update time every minute
    const interval = setInterval(() => {
      setPostData(prevData => [...prevData]); // Force update to trigger re-render
    }, 60000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const getGridColumns = (imageCount) => {
    if (imageCount === 1) return 'grid-cols-1';
    if (imageCount === 2) return 'grid-cols-2';
    if (imageCount === 3) return 'grid-cols-3';
    if (imageCount >= 4) return 'grid-cols-2';
    return ''; // handle other cases as needed
  };

  const handleDeletePost = async (id) => {
    try {
      const response = await axios.delete(`https://back-social-c7nv.onrender.com/post/${id}`, { withCredentials: true });
      console.log(response);
      alert('Post Deleted');
      // After deletion, update postdata state to remove the deleted post
      setPostData(postdata.filter(post => post._id !== id));
    } catch (e) {
      console.log(e);
    }
  };

    // Function to calculate time ago
    const getTimeAgo = (timestamp) => {
      const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000);
  
      let interval = seconds / 31536000;
      if (interval > 1) {
        return Math.floor(interval) + ' years ago';
      }
      interval = seconds / 2592000;
      if (interval > 1) {
        return Math.floor(interval) + ' months ago';
      }
      interval = seconds / 86400;
      if (interval > 1) {
        return Math.floor(interval) + ' days ago';
      }
      interval = seconds / 3600;
      if (interval > 1) {
        return Math.floor(interval) + ' hours ago';
      }
      interval = seconds / 60;
      if (interval > 1) {
        return Math.floor(interval) + ' minutes ago';
      }
      return Math.floor(seconds) + ' seconds ago';
    };
  

  return (
    <div>
      {postdata === null ? (
        <div>Loading</div>
      ) : (
        <div>
          {postdata.map((post) => (
            <div key={post._id}  className=' mb-4  w-full bg-white p-5'>
              <div className=' mb-5 mt-5 flex items-center gap-4'>
                <div className=' relative'>
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
                </div>
                )}    
                </div>            
              <div className='w-full flex justify-between'>
                  <div>
                  <div className='flex'>
                    {user ? user.name : 'David John'}
                    <div className='ml-2 text-gray-500'>shared a post</div>
                  </div>
                  <p>{getTimeAgo(post.createdAt)}</p>
                  </div>
                  

                  <div className='relative'>
                    <div
                      className='cursor-pointer'
                      onClick={() => setShowDropdownId(showDropdownId === post._id ? null : post._id)}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth={1.5}
                        stroke='currentColor'
                        className='w-6 h-6'
                      >
                        <path
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          d='M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z'
                        />
                      </svg>
                    </div>
                    {showDropdownId === post._id && (
                      <div className=' w-[200px] absolute p-2 -left-[200px] mt-2 bg-white rounded-md shadow-lg'>
                        <div
                          className='py-1'
                          role='menu'
                          aria-orientation='vertical'
                          aria-labelledby='options-menu'
                        >
                          <div
                            className='block font-bold hover:text-white hover:bg-blue-500 px-4 py-2 text-sm text-gray-700 rounded-md  cursor-pointer'
                            role='menuitem'
                            onClick={() => {
                              setDeletePopupVisible(true);
                              setPostIdToDelete(post._id);
                              setShowDropdownId(null);
                            }}
                          >
                            Delete
                          </div>
                          
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className='p-5'>
                <h1>{post.text}</h1>
                <div className={`grid gap-4 ${getGridColumns(post.imageUrls.length)}`}>
                  {post.imageUrls.map((url, index) => (
                    <div className='h-[287px]'>
                    <img
                      className='object-cover rounded-xl w-full h-full'
                      key={index}
                      src={`https://back-social-c7nv.onrender.com/${url}`}
                      alt=''
                    />
                  </div>
                  
                  ))}
                </div>
                <hr className="border border-gray-400 my-4" />
                <div className=' mb-4 px-5 p-1 mt-5 gap-10 flex'>
                <div className='flex' onClick={() => setLikes(prevLikes => prevLikes + 1)}>
                <div className={Likes ? 'w-6 h-6 bg-red-500 rounded-full p-1 mr-2' : 'w-6 h-6 rounded-full p-1 mr-2'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={Likes ? 'text-white' : 'text-red-500'}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
                  </div>
                   {Likes}
                </div>

                  <div onClick={() => setComments(prevComments => prevComments + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                   <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                     {Comments}
                  </div>
                  <div className=' gap-2 flex' onClick={() => setShare(prevShare => prevShare + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
                   </svg>
                      {Share}
                  </div>
                </div>
                <div className=' flex items-center gap-4'>
                  <div>
                <img
                src={profilePicture}
                alt='Profile'
                className='w-[50px] h-[50px] rounded-full overflow-hidden'
              />
              </div>
              <div className=' w-full'>
            <input onChange={(e) => settext(e.target.value)} type='text' placeholder=' Leave A Comment Here!' className=' outline-none w-full rounded-2xl pl-2  border p-2 ' />
            
            </div>
            
                </div>
                {text && (
              <div className=' flex items-center mt-5 gap-4'>
              <img
              src={profilePicture}
              alt='Profile'
              className='w-[50px] h-[50px] rounded-full overflow-hidden'
            />
            <p className=' bg-gray-300 p-2 rounded-xl ml-2'>{text}</p>
            </div>
            )}
              </div>
            </div>
          ))}
        </div>
      )}
      {deletePopupVisible && (
        <div className='fixed inset-0 flex justify-center items-center bg-white bg-opacity-75'>
          <div className='bg-white p-5 rounded-md shadow-md'>
            <p>Are you sure you want to delete this post?</p>
            <div className='flex justify-center mt-3'>
              <button
                className='px-4 py-2 bg-red-500 text-white rounded-md mr-2'
                onClick={() => {
                  handleDeletePost(postIdToDelete);
                  setDeletePopupVisible(false);
                }}
              >
                Delete
              </button>
              <button
                className='px-4 py-2 bg-gray-200 text-gray-800 rounded-md'
                onClick={() => setDeletePopupVisible(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
