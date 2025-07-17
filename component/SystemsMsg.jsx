import React from "react";

const SystemsMsg = ({ msg }) => {
  return (
    <div className="flex justify-center my-2">
      <p className="bg-gray-800 text-white text-xs px-3 py-1 rounded-full shadow-sm">
        {msg}
      </p>
    </div>
  );
};

export default SystemsMsg;
