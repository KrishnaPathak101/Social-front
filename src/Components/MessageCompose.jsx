import React, { useState } from 'react';
import axios from 'axios';

const MessageCompose = ({ recipientId, onClose }) => {
  const [message, setMessage] = useState('');

  const sendMessage = async () => {
    try {
      // Make an API call to send the message
      await axios.post('https://back-social-c7nv.onrender.com/send-message', {
        recipientId,
        message
      }, { withCredentials: true });
      // Close the messaging interface/modal
      alert("Message Sent Successfully!")
      onClose();
    } catch (error) {
      console.error('Error sending message:', error);
      alert("Couldn't sent message successfully")
    }
  };

  return (
    <div>
      {recipientId}
      <textarea value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageCompose;
