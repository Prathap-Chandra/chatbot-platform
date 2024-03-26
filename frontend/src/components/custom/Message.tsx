// Message.jsx
type MessageProps = {
    isUser: boolean,
    text: string,
    time: string,
    avatar: string,
    action_buttons: Array<{ text: string }>,
    onActionButtonClick: (button: { text: string }) => void
};

const Message = ({ isUser, text, time, avatar, action_buttons, onActionButtonClick }: MessageProps) => {
  const messageClass = isUser
    ? 'bg-blue-500 text-white float-right'
    : 'bg-gray-300 text-black float-left';
  const avatarClass = isUser ? 'order-last ml-2' : 'order-first mr-2';

  return (
    <div className={`flex items-end ${isUser ? 'justify-end' : 'justify-start'} my-2`}>
      <img src={avatar} className={`rounded-full w-10 h-10 ${avatarClass}`} alt="avatar" />
      <div className={`rounded-lg px-4 py-2 ${messageClass}`}>
        <p>{text}</p>
        {action_buttons && action_buttons.map(button => (
          <button
            key={button.text}
            onClick={() => onActionButtonClick(button)}
            className="text-xs bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded mx-1 my-2"
          >
            {button.text}
          </button>
        ))}
      </div>
      <span className="text-xs text-gray-500 self-end mb-1 ml-2 mr-2">{time}</span>
    </div>
  );
};

export default Message;
