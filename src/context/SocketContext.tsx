'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { socket, connectSocket, disconnectSocket } from '@/lib/socket';
import { Socket } from 'socket.io-client';

interface SocketContextType {
  socket: Socket;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

export const SocketProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('🔌 Connected to Socket.io server');
    }

    function onDisconnect() {
      setIsConnected(false);
      console.log('❌ Disconnected from Socket.io server');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    // Auto-connect if token exists (logic can be expanded based on AuthContext)
    const token = localStorage.getItem('token');
    if (token) {
      connectSocket(token);
    }

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
