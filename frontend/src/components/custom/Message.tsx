// Message.jsx
import React from 'react';

type MessageProps = {
    isUser: boolean;
    text: string;
    time: string;
    avatar: string;
};

const Message: React.FC<MessageProps> = ({ isUser, text, time, avatar }) => {
    const messageClass = isUser
        ? 'bg-blue-500 text-white'
        : 'bg-gray-300 text-gray-800';
    const containerClass = isUser ? 'justify-end' : 'justify-start';
    const avatarClass = isUser ? 'order-2' : '';

    return (
        <div className={`flex ${containerClass} mb-4`}>
            <img src={avatar} className={`rounded-full w-10 h-10 ${avatarClass}`} alt="avatar" />
            <div className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${messageClass}`}>
                <p>{text}</p>
            </div>
            <span className="text-xs text-gray-500">{time}</span>
        </div>
    );
};

export default Message;