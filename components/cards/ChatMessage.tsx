import React from "react";

function ChatMessage({ messages }: { messages: any }) {
  return (
    <div className="flex flex-col">
      {messages.map((message: any) => (
        <div
          key={message.id}
          className={`my-2 mx-5 p-3 rounded-lg bg-gray-300 text-black ${
            message.isReceived ? "self-start" : "self-end"
          }`}
          style={{ width: "max-content" }} // Set width to max-content
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatMessage;
