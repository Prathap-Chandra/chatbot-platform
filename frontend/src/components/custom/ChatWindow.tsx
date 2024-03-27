// ChatWindow.tsx
import { useState, useEffect } from "react";
import Message from "./Message";
import MessageInput from "./MessageInput";

const ChatWindow = () => {
  const [messages, setMessages] = useState<
    {
      id: number;
      isUser: boolean;
      text: unknown;
      time: string;
      avatar: string;
    }[]
  >([]);

  useEffect(() => {
    // Simulate receiving a welcome message with buttons when the chat loads
    const welcomeMessage = {
      id: 1,
      isUser: false,
      text: "Welcome! How can I assist you today? how are you doing today?  how are you doing today?  how are you doing today?  how are you doing today?  how are you doing today?  how are you doing today?",
      time: "09:00",
      avatar: "bot_avatar_url", // Replace with actual bot avatar URL
      action_buttons: [
        { text: "View Documents", type: "postback" },
        { text: "Get Holiday Calendar", type: "web_url", url: "https://google.com" },
        { text: "Check Payroll", type: "postback" },
      ],
    };
    setMessages([welcomeMessage]);
  }, []);

  const handleSendMessage = (newMessage: unknown) => {
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

  const handleActionButtonClick = (button: {
    type: string;
    text: string;
    url: string | URL | undefined;
  }) => {
    if (button.type === "postback") {
      // Handle the postback action here
      handleSendMessage(button.text);
    } else if (button.type === "web_url") {
      // Open the URL in a new window/tab if it is a 'web_url' type
      window.open(button.url, "_blank");
    }
  };

  return (
    <div className="flex flex-col min-h-[500px] min-w-[600px] mx-auto border-x border-gray-300">
      <div className="flex-1 overflow-y-auto">
        {messages.map((message) => (
          <Message
            key={message.id}
            onActionButtonClick={handleActionButtonClick}
            {...message}
          />
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
