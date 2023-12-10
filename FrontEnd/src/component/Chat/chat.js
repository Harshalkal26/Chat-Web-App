import React, { useEffect, useState } from "react";
import { user } from "../Join/Join";
import socketIo from "socket.io-client";
import "./chat.css";
import Message from "../Message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";

let socket;
const ENDPOINT = "http://localhost:4100";

console.log(user);

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessage] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
      alert("connected");
    });
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("userJoined", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message);
    });

    return () => {
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessage([...messages, data]);
      console.log(data.user, data.message, data.id);
    });

    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h1>C CHAT</h1>
          <a href="/">X</a>
        </div>

        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
            <Message
              user={item.id === id ? "" : item.user}
              message={item.message}
              classs={item.id === id ? "right" : "left"}
            />
          ))}
        </ReactScrollToBottom>

        <div className="inputBox">
          <input type="text" id="chatInput" />
          <button onClick={send} className="inputbtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
