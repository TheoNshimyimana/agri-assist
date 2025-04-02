import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { SendHorizonal, Loader2 } from "lucide-react";

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<{ role: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);


  const API_KEY = "sk-cFuabsslQHwsgj8SOQLHH4EIC7U9BKQEjDbyfiguZ2aUaexK";

  const sendMessage = async () => {
    if (!message.trim()) return;

   
    if (
      API_KEY.startsWith("goey_sk_live") &&
      window.location.hostname === "localhost"
    ) {
      alert("⚠️ Never use production keys in local development!");
      return;
    }

    setLoading(true);
    const userMessage = { role: "user", text: message };
    setResponses((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await axios.post(
        "https://api.gooey.ai/v2/Loop/",
        {
          model: "gpt-3.5-turbo",
          input: message, 
          
        },
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const botResponse = {
        role: "bot",
        text: response.data.output, // Gooey response structure
      };
      setResponses((prev) => [...prev, botResponse]);
    } catch (error) {
      let errorMessage = "Unknown error";
      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.detail || "API Error";
      }
      setResponses((prev) => [
        ...prev,
        {
          role: "bot",
          text: `⚠️ Error: ${errorMessage}`,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Auto-scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [responses]);

  // Enter key handler
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-full rounded-lg shadow-lg flex flex-col">
        <div className="p-4 rounded-t-lg text-center text-3xl font-bold mb-4">
          How Can I Assist you Today
        </div>

        <div
          ref={chatRef}
          className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96"
        >
          {responses.map((res, index) => (
            <div
              key={index}
              className={`flex ${
                res.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-lg max-w-xs ${
                  res.role === "user"
                    ? "bg-blue-500 text-white text-sm"
                    : "bg-gray-700 text-gray-200 text-sm"
                } break-words`}
              >
                {res.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-gray-700 text-gray-200 flex items-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Thinking...
              </div>
            </div>
          )}
        </div>

        <div className="p-3 border-t border-gray-700 flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 p-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none"
            placeholder="Ask Gooey AI..."
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading}
            className="bg-blue-500 p-2 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition-colors"
          >
            <SendHorizonal className="h-5 w-5 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
