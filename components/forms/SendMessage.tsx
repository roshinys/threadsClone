"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

function SendMessage() {
  const [message, setMessage] = useState("");
  const handleSentMessage = () => {
    if (message.trim().length === 0) {
      return;
    }
    console.log(message);
  };
  return (
    <div className="searchbar">
      <Input
        id="text"
        value={message}
        onChange={(e) => {
          setMessage(e.target.value);
        }}
        placeholder="Enter Text"
        className="no-focus searchbar_input"
      />
      <Image
        src="/assets/enter.svg"
        alt="Enter"
        width={24}
        height={24}
        className="object-contain"
        onClick={handleSentMessage}
      />
    </div>
  );
}

export default SendMessage;
