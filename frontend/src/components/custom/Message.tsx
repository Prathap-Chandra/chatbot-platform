// Message.jsx
type MessageProps = {
    isUser: boolean,
    text: string,
    time: string,
    avatar: string,
    action_buttons: Array<{ text: string }>,
    onActionButtonClick: (button: { text: string }) => void
};

// const Message = ({ isUser, text, time, avatar, action_buttons, onActionButtonClick }: MessageProps) => {
//   const messageClass = isUser
//     ? 'bg-blue-500 text-white float-right'
//     : 'bg-gray-300 text-black float-left';
//   const avatarClass = isUser ? 'order-last ml-2' : 'order-first mr-2';

//   return (
//     <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
//       <img src={avatar} className={`rounded-full w-10 h-10 ${avatarClass}`} alt="avatar" />
//       <div className={`rounded-lg px-4 py-2 ${messageClass}`}>
//         <p>{text}</p>
//         {action_buttons && action_buttons.map(button => (
//           <button
//             key={button.text}
//             onClick={() => onActionButtonClick(button)}
//             className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1 my-2"
//           >
//             {button.text}
//           </button>
//         ))}
//       </div>
//       <span className="text-xs text-gray-500 self-end mb-1 ml-2 mr-2">{time}</span>
//     </div>
//   );
// };

// const Message = ({ isUser, text, time, avatar, action_buttons, onActionButtonClick }: MessageProps) => {
//   // Determine the alignment classes based on whether the message is from the user or not
//   const alignmentClass = isUser ? 'items-end justify-end' : 'items-start justify-start';
//   const messageClass = isUser
//     ? 'bg-blue-500 text-white float-right'
//     : 'bg-gray-300 text-black float-left';
//   const avatarClass = isUser ? 'ml-2 order-2' : 'mr-2 order-1';
//   const timeClass = isUser ? 'order-3 ml-2' : 'order-3 mr-2'; // Adjust the margin for time based on user

//   return (
//     <div className={`flex ${alignmentClass} my-2`}>
//       {/* Avatar image */}
//       <img src={avatar} className={`rounded-full w-10 h-10 ${avatarClass}`} alt="avatar" />
//       {/* Message bubble */}
//       <div className={`rounded-lg px-4 py-2 ${messageClass}`}>
//         <p>{text}</p>
//         {/* Action buttons */}
//         {action_buttons && action_buttons.map(button => (
//           <button
//             key={button.text}
//             onClick={() => onActionButtonClick(button)}
//             className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1 my-2"
//           >
//             {button.text}
//           </button>
//         ))}
//       </div>
//       {/* Time stamp */}
//       <span className={`text-xs text-gray-500 self-end mb-1 ${timeClass}`}>{time}</span>
//     </div>
//   );
// };

// const Message = ({ isUser, text, time, avatar, action_buttons, onActionButtonClick }: MessageProps) => {
//   const containerClass = isUser ? 'flex-row-reverse' : 'flex-row';
//   const messageClass = isUser
//     ? 'bg-blue-500 text-white mr-2'
//     : 'bg-gray-300 text-black ml-2';
//   const timeClass = isUser ? 'text-right ml-2' : 'text-left mr-2';

//   return (
//     <div className={`flex ${containerClass} items-end my-2`}>
//       {/* Avatar */}
//       <div className="flex flex-col items-center">
//         <img src={avatar} className="rounded-full w-10 h-10" alt="avatar" />
//         {/* Time */}
//         <span className={`text-xs text-gray-500 ${timeClass}`}>{time}</span>
//       </div>
//       {/* Message bubble and action buttons */}
//       <div className={`flex flex-col ${messageClass}`}>
//         <p className="px-4 py-2 rounded-lg">{text}</p>
//         {action_buttons && action_buttons.map((button, index) => (
//           <button
//             key={index}
//             onClick={() => onActionButtonClick(button)}
//             className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1 my-2"
//           >
//             {button.text}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

const Message = ({
  isUser,
  text,
  time,
  avatar,
  action_buttons,
  onActionButtonClick,
}: MessageProps) => {
  const messageContainerClass = isUser
    ? 'flex justify-end my-2'
    : 'flex justify-start my-2';
  const messageClass = isUser
    ? 'bg-blue-500 text-white float-right'
    : 'bg-gray-300 text-black float-left';
  const avatarAndTimeClass = isUser ? 'ml-2' : 'mr-2';

  return (
    <div className={messageContainerClass}>
      {!isUser && (
        <div className="flex flex-col">
          <img
            src={avatar}
            className={`rounded-full w-10 h-10 ${avatarAndTimeClass}`}
            alt="avatar"
          />
          <span className={`text-xs text-gray-500 ${avatarAndTimeClass}`}>
            {time}
          </span>
        </div>
      )}
      
      <div>
        <div className={`rounded-lg px-4 py-2 ${messageClass}`}>
          <p>{text}</p>
          {action_buttons &&
            action_buttons.map((button) => (
              <button
                key={button.text}
                onClick={() => onActionButtonClick(button)}
                className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1 my-2"
              >
                {button.text}
              </button>
            ))}
        </div>
      </div>
      {isUser && (
        <div className="flex flex-col">
          <img
            src={avatar}
            className={`rounded-full w-10 h-10 ${avatarAndTimeClass}`}
            alt="avatar"
          />
          <span className={`text-xs text-gray-500 ${avatarAndTimeClass}`}>
            {time}
          </span>
        </div>
      )}
    </div>
  );
};

export default Message;
