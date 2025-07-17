"use client";
import { useState, useRef, useEffect } from "react";
import { io } from "socket.io-client";
import SystemsMsg from "@/component/SystemsMsg";
import OwnMsg from "@/component/OwnMsg";
import FrindsMsg from "@/component/FrindsMsg";

export default function Home() {
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false); // 👈 NEW STATE
  const socket = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.current = io("https://chat-io-8s7x.onrender.com");

    socket.current.emit("newUser", username);

    socket.current.on("get-users", (data) => {
      setUsers(Object.values(data));
    });

    socket.current.on("joined", (data) => {
      setMessages((prev) => [...prev, { user: "system", msg: data }]);
    });

    socket.current.on("recieveMsg", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    setIsJoined(true);
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (msg.trim() === "") return;
    socket.current.emit("sendMsg", { user: username, msg: msg });
    setMsg("");
  };

  return (
    <>
      {isJoined ? (
        <main className="relative">
          {/* Sidebar */}
          {showUsers && (
            <aside className="absolute top-0 right-0 w-64 h-full bg-white shadow-lg p-4 z-50 border-l border-gray-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Online Users</h2>
                <button
                  onClick={() => setShowUsers(false)}
                  className="text-red-500 text-xl cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <ul className="space-y-2">
                {users.map((user, i) => (
                  <li
                    key={i}
                    className={`text-sm ${
                      user === username ? "font-semibold text-blue-500" : ""
                    }`}
                  >
                    {user === username ? "You" : user}
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Chat section */}
          <section className="bg-gray-100 h-screen flex flex-col w-screen">
            {/* Header */}
            <div className="bg-blue-500 p-4 text-white text-center flex justify-between px-8">
              <button
                className="flex justify-center gap-1 items-center cursor-pointer"
                onClick={() => setShowUsers(!showUsers)}
              >
                <img src="/green-dot.gif" width="20" alt="online" />
                Online: {users.length}
              </button>
              <h1 className="text-3xl font-bold">thechat.in</h1>
              <div></div> {/* filler */}
            </div>

            {/* Chat area */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex flex-col space-y-2">
                {messages.map((i, idx) =>
                  i.user === "system" ? (
                    <SystemsMsg key={idx} msg={i.msg} />
                  ) : i.user !== username ? (
                    <FrindsMsg key={idx} msg={i.msg} username={i.user} />
                  ) : (
                    <OwnMsg key={idx} msg={i.msg} username={"You"} />
                  )
                )}
              </div>
            </div>

            {/* Input box */}
            <div className="bg-white p-4 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type your message..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none"
                onChange={(e) => setMsg(e.target.value)}
                value={msg}
              />
              <button onClick={sendMessage} className="cursor-pointer">
                <img src="/paper-plane.png" alt="send" width={20} />
              </button>
            </div>
          </section>
        </main>
      ) : (
        // Login screen
        <div className="w-screen h-screen flex justify-center items-center flex-col gap-8 bg-gradient-to-br from-sky-100 to-blue-200">
          <h1 className="font-extrabold text-4xl text-blue-600 drop-shadow-sm">
            Welcome to <span className="text-blue-800">thechat.in</span>
          </h1>

          <form
            onSubmit={handleSubmit}
            className="w-[90%] max-w-md bg-white shadow-lg rounded-2xl px-6 py-10 flex flex-col items-center gap-4"
          >
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="Enter your username"
              className="w-full border border-blue-300 focus:border-blue-500 focus:ring focus:ring-blue-100 p-3 rounded-xl outline-none text-sm"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 transition-colors text-white font-semibold py-2 rounded-xl shadow-md"
            >
              Join Chat
            </button>
          </form>
        </div>
      )}
    </>
  );
}
