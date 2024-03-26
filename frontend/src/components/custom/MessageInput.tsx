// MessageInput.jsx

import { useState } from "react";

const MessageInput = ({
  onSendMessage,
}: {
  onSendMessage: (message: string) => void;
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  return (
    <form
      className="flex items-center justify-between w-full p-3 border-t border-gray-300"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="Type a message"
        className="flex-1 appearance-none border-none p-2 text-gray-800 leading-tight focus:outline-none"
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        type="submit"
        className="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none"
      >
        Send
      </button>
    </form>
  );
};

export default MessageInput;
