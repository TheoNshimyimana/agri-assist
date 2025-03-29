import React, { useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const AIChatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with crop monitoring today?" }
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const newMessages = [...messages, { sender: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      const botResponse = {
        sender: "bot",
        text: "Thank you for your message! I will analyze your query and provide insights."
      };
      setMessages([...newMessages, botResponse]);
    }, 1000);
  };

  // Define the event parameter type for the input onChange handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">AI Chatbot</h2>
      <div className="h-64 overflow-y-auto border p-4 rounded bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${msg.sender === "user" ? "bg-blue-500 text-white self-end" : "bg-gray-300 text-black self-start"}`}
          >
            <p>{msg.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-4 flex gap-2">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange} 
          placeholder="Type a message..."
          className="border p-2 rounded w-full"
        />
        <Button onClick={handleSend} className="bg-green-500 hover:bg-green-600 text-white">
          Send
        </Button>
      </div>
    </div>
  );
};

export default AIChatbot;
