import React, { useState } from "react";
import logo from "../../image/Logo.png";
import "./Join.css";
import { Link } from "react-router-dom";

let user;

const Join = () => {
  const [name, setName] = useState("");
  const sendUser = () => {
    user = document.getElementById("joininput").value;
    document.getElementById("joininput").value = "";
  };
  console.log(user);
  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        <img src={logo} alt="logo" />
        <h1>C CHAT</h1>
        <input
          onChange={(e) => {
            setName(e.target.value);
          }}
          placeholder="Enter Your Name"
          type="text"
          id="joininput"
        />
        <Link
          to="./chat"
          onClick={(event) => (name === "" ? event.preventDefault() : null)}
        >
          <button onClick={sendUser} className="joinbtn">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Join;
export { user };
