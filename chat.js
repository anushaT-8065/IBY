import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import ChatBox from '../components/ChatBot'; 

export default function Chat() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketConnection = io('http://localhost:5001');
    setSocket(socketConnection);

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  return (
    <div className="txt">
      <h1 className="text-3xl font-bold mb-4"><b><u>Messaging Service Prototype</u></b></h1>
      {socket ? <ChatBox socket={socket} /> : <div>Loading chat...</div>}
   </div>
  );
}
