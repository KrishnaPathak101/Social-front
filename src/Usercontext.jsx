// UserContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import io from 'socket.io-client';

export const Usercontext = createContext({});
 // Connect to WebSocket server
const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [onlineStatus, setOnlineStatus] = useState(false); // Add onlineStatus state

    useEffect(() => {
        if (!user) {
            fetch('https://back-social-c7nv.onrender.com/profile', { credentials: 'include' })
                .then((res) => res.json())
                .then((data) => setUser(data))
                .catch((e) => console.log(e));
        }
        const socket = io('https://back-social-c7nv.onrender.com');

       if(user) {
        
        socket.on('connect', () => {
            console.log('Connected to WebSocket server');
        });

       socket.on('welcome', (data) => {
            console.log(data);
            setOnlineStatus(true); // Set onlineStatus to true
       });
       }

        return () => {
            socket.disconnect(); // Disconnect from WebSocket server when component unmounts
        };
    }, [user]);

    return (
        <Usercontext.Provider value={{ user, onlineStatus, setUser }}>
            {children}
        </Usercontext.Provider>
    );
};

export default UserContextProvider;
