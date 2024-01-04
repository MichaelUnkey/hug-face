"use client";

import { useChat } from "ai/react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import { getKeyCookie, setKeyCookie } from "./actions/actions";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <div className=" mx-auto bg-white rounded-xl shadow-md overflow-hidden">
      <Card className="flex flex-col lg:w-1/2  mx-auto h-screen bg-slate-500">
        <div className="flex flex-col w-full mx-auto stretch h-full">
          <h1 className="text-xl font-bold text-white md:text-xl pt-6 text-center">
            Chat Page
          </h1>
          <ScrollArea className="h-3/4 mx-auto max-w-4xl rounded-md p-4 ">
            {messages.map((m) => (
              <Card
                key={m.id}
                className={cn(
                  "whitespace-pre-wrap",
                  {
                    "bg-violet-500 font-semibold mr-80": m.role === "user",
                    "bg-blue-600 ml-80": m.role !== "user",
                  },
                  "p-4 rounded-2xl text-slate-50 mt-8"
                )}
              >
                {" "}
                {m.role === "user" ? `${user?.username} : ` : "AI: "}
                <CardContent>
                  <p>{m.content}</p>
                </CardContent>
              </Card>
            ))}
          </ScrollArea>
          <form onSubmit={handleSubmit} className=" ">
            <Input
              className="sticky bg-white mx-auto max-w-4xl p-2 rounded-xl shadow-2xl justify-center "
              value={input}
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </Card>
    </div>
  );
}
