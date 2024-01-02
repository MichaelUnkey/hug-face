"use client";
import { UserButton } from "@clerk/nextjs";
import { useChat } from "ai/react";
import { metadata } from "./layout";
import { useEffect, useState } from "react";

export default function Chat() {
  const [keyData, setKeyData] = useState("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    headers: { Authorization: `Bearer ${keyData}` },
  });
  useEffect(() => {
    const fetchKeyData = async () => {
      if (!localStorage.getItem("keyData")) {
        const response = await fetch("/api/unkey");
        const data = await response.json();
        localStorage.setItem("keyData", data.key);
        setKeyData(data.key);
      }

      setKeyData(localStorage.getItem("keyData")!);
      return;
    };
    fetchKeyData();
  }, []);

  return (
    <div>
      <UserButton afterSignOutUrl="/" />
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            {m.role === "user" ? "User: " : "AI: "}
            {m.content}
          </div>
        ))}
        <form onSubmit={handleSubmit}>
          <input
            className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />
        </form>
      </div>
    </div>
  );
}
