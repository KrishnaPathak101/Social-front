import React, { useState } from 'react';
import axios from 'axios';
import Feed from '../pages/Feed';
import Imageshow from './Imageshow';

const ImageUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

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
      console.log(response.data); // Assuming the response contains the uploaded image objects
      const uploadedUrls = response.data.map(image => image.path);
      setImageUrls(prevImageUrls => [...prevImageUrls, ...uploadedUrls]);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  return (
    <>
    <div className=' mb-10'>
    <Imageshow  imageUrls={imageUrls} />
    </div>
    <div className=''>
     
      <label htmlFor="file-upload" className="custom-file-upload">
        <span className= " block fixed cursor-pointer">
        photos
        </span>
      </label>
      <input id="file-upload" type="file" onChange={handleFileChange} className="hidden" multiple />
      
    </div>
    </>
  );
};

export default ImageUpload;