import React from "react";

const OwnMsg = ({ msg, username }) => {
  return (
    <div className="flex flex-col items-end px-4">
      <p className="text-[10px] text-gray-500 mr-2">{username}</p>
      <div className="bg-blue-500 text-white px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-bl-2xl shadow-md max-w-xs break-words">
        {msg}
      </div>
    </div>
  );
};

export default OwnMsg;
