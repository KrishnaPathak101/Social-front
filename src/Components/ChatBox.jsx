import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const ChatBox = ({ friendId }) => {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [socket, setSocket] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Connect to the Socket.IO server
    const newSocket = io('https://back-social-c7nv.onrender.com', { withCredentials: true });
    setSocket(newSocket);

    // Cleanup function to disconnect socket when component unmounts
    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Subscribe to new message events from the server
      socket.on('new-message', newMessage => {
        setMessages(prevMessages => [...prevMessages, newMessage]);
      });

      // Handle socket errors
      socket.on('error', error => {
        setError(error);
      });
    }
  }, [socket]);

  useEffect(() => {
    // Fetch chat history when friendId changes
    if (friendId && socket) {
      // Fetch chat history between current user and friendId from the server
      axios.get(`https://back-social-c7nv.onrender.com/chat/${friendId}`, { withCredentials: true })
        .then(response => {
          setMessages(response.data.messages);
        })
        .catch(error => {
          console.error('Error fetching chat history:', error);
          setError(error);
        });
    }
  }, [friendId, socket]);

  const sendMessage = () => {
    // Send message to the server
    if (messageInput.trim() !== '' && socket) {
      socket.emit('send-message', {
        recipientId: friendId,
        message: messageInput.trim()
      }, { withCredentials: true });

      // Clear message input after sending
      setMessageInput('');
    }
  };

  return (
    <div className="p-4 bg-gray-100">
      {messages.message}
      {error && <div className="text-red-500">{error.message}</div>}
      <div className="overflow-y-auto max-h-60">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-semibold">{msg.message}</span>: {msg.text}
          </div>
        ))}
      </div>
      <div className="mt-4 flex">
        <textarea
          value={messageInput}
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded"
        />
        <button onClick={sendMessage} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
