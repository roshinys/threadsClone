import React, { useEffect } from "react";

function ChatMessage({ messages }: { messages: any }) {
  useEffect(() => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col h-45 bg-dark-2 overflow-y-auto mb-20">
      {messages.map((message: any) => (
        <div
          key={message.id}
          className={`my-2 mx-5 p-3 rounded-lg bg-gray-300 text-black ${
            message.isReceived ? "self-start" : "self-end"
          }`}
          style={{ width: "max-content" }}
        >
          {message.text}
        </div>
      ))}
    </div>
  );
}

export default ChatMessage;
