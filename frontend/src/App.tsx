// import React, { useState } from "react";
// import Message from "./components/custom/Message";

// interface Message {
//   id: number;
//   text: string;
// }

// const App = () => {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputValue, setInputValue] = useState("");

//   const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;
//     setMessages([...messages, { id: messages.length + 1, text: inputValue }]);
//     setInputValue("");
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
//       <div className="mb-4 h-64 overflow-y-auto">
//         {messages.map((message) => (
//           <Message key={message.id} text={message.text} isUser={false} time={""} avatar={""} />
//         ))}
//       </div>
//       <form className="flex" onSubmit={sendMessage}>
//         <input
//           className="flex-1 p-2 border-2 border-gray-200 rounded-l-lg"
//           type="text"
//           placeholder="Type a message..."
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//         />
//         <button
//           className="px-4 bg-blue-500 text-white rounded-r-lg"
//           type="submit"
//         >
//           Send
//         </button>
//       </form>
//     </div>
//   );
// };

// export default App;

import './App.css'; // Make sure to import your main CSS file if it's not already
import ChatWindow from './components/custom/ChatWindow';

function App() {
  return (
    <div className="App">
      <ChatWindow />
    </div>
  );
}

export default App;
