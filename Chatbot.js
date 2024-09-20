import { useState, useEffect } from 'react';
import io from 'socket.io-client';

export default function ChatBox({ socket }) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [chatRoom] = useState('defaultRoom');
  const [username] = useState('defaultUser');  

  useEffect(() => {
    socket.emit('joinRoom', chatRoom);

    socket.on('receiveMessage', (messageData) => {
      setMessages((prevMessages) => [...prevMessages, messageData]);
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, chatRoom]);

  const sendMessage = () => {
    if (message.trim() !== '') {
      const messageData = {
        sender: username,
        receiver: 'receiverUser',  
        content: message,
        chatRoom
      };

      socket.emit('sendMessage', messageData);
      setMessage('');
    }
  };

  return (
    <div className="p-4">
      <div className="txt">
        <h3 className="text-3xl font-bold mb-4">Chat here!</h3>
      </div>
      <div className="h-80 border border-gray-300 overflow-y-scroll mb-4 p-2">
        {messages.map((msg, index) => (
          <div key={index} className="mb-2">
            <span className="font-bold">{index + 1}:</span> {msg.content}
          </div>
        ))}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Send
      </button>
    </div>
  );
}
