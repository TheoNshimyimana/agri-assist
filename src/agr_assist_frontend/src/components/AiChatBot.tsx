import React, { useState } from "react";
import { HttpAgent, Actor } from "@dfinity/agent";
import { idlFactory } from "../../../declarations/agr_assist_backend";
import { SendHorizonal, Loader2 } from "lucide-react";

const CANISTER_ID = "bkyz2-fmaaa-aaaaa-qaaaq-cai";

// communicate with the canister
const agent = new HttpAgent({ host: "http://localhost:3000" });
const chatbotBackend = Actor.createActor(idlFactory, {
  agent,
  canisterId: CANISTER_ID,
});

const Chatbot: React.FC = () => {
  const [message, setMessage] = useState("");
  const [responses, setResponses] = useState<{ role: string; text: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);
    setResponses((prev) => [...prev, { role: "user", text: message }]);
    setMessage("");

    try {
      const response: string = String(await chatbotBackend.chat(message));
      setResponses((prev) => [...prev, { role: "bot", text: response }]);
    } catch (error) {
      console.error("Chatbot error:", error);
      setResponses((prev) => [
        ...prev,
        { role: "bot", text: "⚠️ Error communicating with backend" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-white text-gray-700 p-6">
      <div className="w-full max-w-full rounded-lg shadow-lg flex flex-col">
        <div className="p-4 rounded-t-lg text-center text-3xl font-bold mb-4">
          How Can I Assist You Today?
        </div>

        <div className="flex-1 p-4 space-y-3 overflow-y-auto max-h-96">
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
                    : "bg-green-500 text-gray-200 text-sm"
                }`}
              >
                {res.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="p-3 rounded-lg bg-green-700 text-gray-200 flex items-center">
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Loading...
              </div>
            </div>
          )}
        </div>

        <div className="p-3   flex items-center space-x-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !loading && sendMessage()}
            className="flex-1 p-2 rounded-lg bg-white border border-gray-400 text-gray-600 placeholder-gray-400 focus:outline-none"
            placeholder="Ask the AI..."
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
