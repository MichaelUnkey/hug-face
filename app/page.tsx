"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { getKeyCookie, setKeyCookie } from "./actions/actions";

export default function Chat() {
  const { user } = useUser();
  const [keyData, setKeyData] = useState("");
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    headers: { Authorization: `Bearer ${keyData}` },
  });

  useEffect(() => {
    const fetchKeyData = async () => {
      const keyCookie = await getKeyCookie("_keyData");
      if (!keyCookie) {
        const response = await fetch("/api/unkeyCreate");
        const data = await response.json();
        const keyCookieData = await setKeyCookie("_keyData", data.key);
        if (keyCookieData) {
          setKeyData(data.key);
          console.log("cookie set");
        }
      }
      setKeyData(keyCookie?.toString()!);
      return;
    };
    fetchKeyData();
  }, []);

  return (
    <div className="w-1/2 mx-auto h-full rounded-2xl border border-gray-200 shadow-xl bg-slate-200">
      <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch h-full ">
        {messages.map((m) => (
          <div
            key={m.id}
            className={cn(
              "whitespace-pre-wrap",
              {
                "bg-violet-500 font-semibold mr-12": m.role === "user",
                "bg-blue-600 ml-12": m.role !== "user",
              },
              "p-4 rounded-2xl text-slate-50 mt-2"
            )}
          >
            {m.role === "user" ? `${user?.username} : ` : "AI: "}
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
