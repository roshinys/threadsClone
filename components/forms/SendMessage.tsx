"use client";
import Image from "next/image";
import { Input } from "../ui/input";
import { useState } from "react";

interface Props {
  onSendMessage: (messageText: string) => void;
}

function SendMessage({ onSendMessage }: Props) {
  const [message, setMessage] = useState("");
  const handleSentMessage = () => {
    if (message.trim().length === 0) {
      return;
    }
    onSendMessage(message);
    // setMessage("");
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
