// // ChatWindow.tsx
// import { useState } from 'react';
// import Message from './Message';
// import MessageInput from './MessageInput';

// const ChatWindow = () => {
//   const [messages, setMessages] = useState([
//     { id: 1, isUser: false, text: 'Hi there, How are you?', time: '09:00', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/1024px-ChatGPT_logo.svg.png' },
//     { id: 2, isUser: true, text: 'Waiting for your reply. ', time: '09:05', avatar: 'https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1711476329~exp=1711476929~hmac=8908e26fa5534c8c2db9d5d267f3558380765cdf97950ab5ff7170878d45eddc' },
//     // Add more messages here
//   ]);

// const handleSendMessage = (newMessage: string) => {
//     const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//     const message = {
//         id: messages.length + 1,
//         isUser: true,
//         text: newMessage,
//         time: currentTime,
//         avatar: 'user_avatar_url' // Replace with actual user avatar URL
//     };
//     setMessages([...messages, message]);
// };

//   return (
//     <div className="flex flex-col h-screen min-w-[600px] mx-auto border-x border-gray-300">
//       <div className="flex-1 overflow-y-auto">
//         {messages.map((message) => (
//           <Message key={message.id} {...message} />
//         ))}
//       </div>
//       <MessageInput onSendMessage={handleSendMessage} />
//     </div>
//   );
// };

// export default ChatWindow;

// ChatWindow.jsx
import React, { useState, useEffect } from "react";
import Message from "./Message";
import ActionButton from "./ActionButton";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState<
    {
      id: number;
      isUser: boolean;
      text: string;
      time: string;
      avatar: string;
    }[]
  >([]);

  useEffect(() => {
    // Simulate receiving a welcome message when the chat loads
    const welcomeMessage = {
      id: 1,
      isUser: false,
      text: "Welcome! How can I assist you today?",
      time: "09:00",
      avatar: "bot_avatar_url", // Replace with actual bot avatar URL
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = (newMessage: string) => {
    const currentTime = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
    const message = {
      id: messages.length + 1,
      isUser: true,
      text: newMessage,
      time: currentTime,
      avatar: "user_avatar_url", // Replace with actual user avatar URL
    };
    setMessages([...messages, message]);
  };

  const handleActionClick = (actionText: string) => {
    // Here you can handle the click of the action button.
    // For example, you can send a message or perform other actions.
    handleSendMessage(actionText);
  };

  return (
    <div className="flex flex-col h-screen min-w-[600px] mx-auto border-x border-gray-300">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <Message key={message.id} {...message} />
        ))}
        <div className="flex justify-around p-4">
          <ActionButton
            text="View Documents"
            onClick={() => handleActionClick("View Documents")}
          />
          <ActionButton
            text="Get Holiday Calendar"
            onClick={() => handleActionClick("Get Holiday Calendar")}
          />
          <ActionButton
            text="Check Payroll"
            onClick={() => handleActionClick("Check Payroll")}
          />
        </div>
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
