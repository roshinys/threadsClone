"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

function SendMessage() {
  const [message, setMessage] = useState("");
  const handleMessage = () => {
    if (message.trim().length === 0) {
      return;
    }
    console.log(message);
  };
  return (
    <section className="bottombar">
      <div className="bottombar_container">
        <Input
          id="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Text"
          className="no-focus searchbar_input text-light-2"
        />
        <Button className="text-light-2" onClick={handleMessage}>
          Enter
        </Button>
      </div>
    </section>
  );
}

export default SendMessage;
