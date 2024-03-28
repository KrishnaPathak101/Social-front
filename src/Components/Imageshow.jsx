// Imageshow.jsx
import React, { useState } from 'react';

const Imageshow = ({ imageUrls, onDelete }) => {
  const [hoverIndex, setHoverIndex] = useState(null);

  const handleMouseEnter = (index) => {
    setHoverIndex(index);
  };

  const handleMouseLeave = () => {
    setHoverIndex(null);
  };

  const handleDelete = (index) => {
    onDelete(index);
  };

  return (
    <div>
      {imageUrls && (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className=' relative  ml-4 mt-2 flex gap-2 '>
          {imageUrls.map((imageUrl, index) => (
            <div className=" flex image-container w-[100px] h-[50px] " key={index}>
              <img className=' w-full rounded-xl object-cover' src={`https://back-social-c7nv.onrender.com/${imageUrl}`} alt={`Uploaded Image ${index}`} />
              {hoverIndex === index && (
                <button onClick={() => handleDelete(index)} className=' absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex justify-center items-center '>
                  X
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Imageshow;
