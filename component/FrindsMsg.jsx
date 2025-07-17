import React from "react";

const FriendsMsg = ({ msg, username }) => {
  return (
    <div className="flex flex-col items-start px-4">
      <p className="text-[10px] text-gray-500 ml-2 mb-1">{username}</p>
      <div className="bg-gray-300 text-black px-4 py-2 rounded-tr-2xl rounded-tl-2xl rounded-br-2xl shadow-sm max-w-xs break-words">
        {msg}
      </div>
    </div>
  );
};

export default FriendsMsg;
