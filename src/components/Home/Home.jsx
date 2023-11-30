import React from "react";
import { useEffect } from "react";
import { useState } from "react";
// components
import Herosection from "./Herosection";
import Cafesection from "./Cafesection";
import Searchsection from "./Searchsection";
// stylesheet
import "../../css/herosection.css";

const Home = () => {
  const [connectionStatus, setConnectionStatus] = useState("Not Connected...");
  const [clickque, setclickque] = useState([]);
  const [status, setStatus] = useState("offline");

  function sendEventhandler(event) {
    socket.emit("helloconnection", "hello server");
  }
  var onlineshowtimeout = null;
  function onTypingHandler(event) {
    clearTimeout(onlineshowtimeout);
    socket.emit("typing", "typing");
    onlineshowtimeout = setTimeout(onSelectHandler, 1000);
  }

  function onSelectHandler() {
    socket.emit("online", "online");
  }

  function onBlurHandler(event) {
    socket.emit("offline", "offline");
  }

  return (
    <main>
      <Searchsection />
      <Herosection />
      <Cafesection />
      <div>
        <p>{connectionStatus}</p>
        <input
          type={"text"}
          onChange={onTypingHandler}
          onFocus={onSelectHandler}
          onBlur={onBlurHandler}
        />
        <p>{status}</p>
        <button
          onClick={sendEventhandler}
          className="border-solid border-red-400 rounded-lg border-2 bg-red-400 p-3	text-red-50	"
        >
          Send Event
        </button>
        <div>
          {clickque.map((element) => {
            return <p>{element}</p>;
          })}
        </div>
      </div>
    </main>
  );
};

export default Home;
