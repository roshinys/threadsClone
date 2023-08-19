"use client";
import React, { useState } from "react";
import ChatPageHeader from "../shared/ChatPageHeader";
import ChatMessage from "./ChatMessage";
import SendMessage from "../forms/SendMessage";

const DUMMY_CHAT = [
  {
    id: 1,
    isReceived: false,
    text: "hi",
  },
  {
    id: 2,
    isReceived: true,
    text: "hello",
  },
  {
    id: 3,
    isReceived: false,
    text: "How are you doing",
  },
  {
    id: 4,
    isReceived: true,
    text: "Great I guess",
  },
  {
    id: 5,
    isReceived: true,
    text: "what about you ",
  },
  {
    id: 6,
    isReceived: false,
    text: "Am Good",
  },
];

interface Props {
  username: string;
  image: string;
}

function Chat({ username, image }: Props) {
  const [messages, setMessages] = useState(DUMMY_CHAT);

  const onSendMessage = (messageText: string) => {
    setMessages((prevState) => {
      return [
        ...prevState,
        {
          id: Math.random(),
          isReceived: true,
          text: messageText,
        },
      ];
    });
  };
  return (
    <>
      <div>
        <ChatPageHeader username={username} imgUrl={image} />
        <ChatMessage messages={messages} />
      </div>
      <div className="h-20 bg-dark-2 fixed bottom-0 left-0 w-full p-3">
        <SendMessage onSendMessage={onSendMessage} />
      </div>
    </>
  );
}

export default Chat;
