"use client";

import { useCompletion } from "ai/react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { getKeyCookie, setKeyCookie } from "../actions/actions";

export default function Chat() {
  const { user } = useUser();
  const [keyData, setKeyData] = useState("");
  const { completion, input, handleInputChange, handleSubmit, error, data } =
    useCompletion({ headers: { Authorization: `Bearer ${keyData}` } });

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
    <div className="flex flex-col w-1/2 mx-auto h-full border border-slate-400 rounded-xl ">
      <div className="flex flex-col w-full max-w-md pt-16 mx-auto h-full ">
        <h4 className="text-xl font-bold text-gray-900 md:text-xl pb-6">
          Completion Example
        </h4>
        <div className="h-full w-full ">
          {data && (
            <div>
              <pre className="p-4 text-sm border ">
                {JSON.stringify(data, null, 2)}
              </pre>
            </div>
          )}
          {error && (
            <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
              {error.message}
            </div>
          )}
          {completion}
          <form onSubmit={handleSubmit}>
            <input
              className="fixed bottom-0 w-full max-w-md p-2 mb-8 rounded-xl shadow-2xl bg-white"
              value={input}
              name="completionInput"
              placeholder="Say something..."
              onChange={handleInputChange}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
