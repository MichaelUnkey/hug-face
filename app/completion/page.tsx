'use client';

import { useCompletion } from 'ai/react';
import { useEffect, useState } from "react";

export default function Chat() {
  const [keyData, setKeyData] = useState("");
  const { completion, input, handleInputChange, handleSubmit, error, data } =
    useCompletion({headers: { Authorization: `Bearer ${keyData}` }
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
    <div className="flex flex-col w-1/2 mx-auto h-full bg-slate-200">
      <div className="flex flex-col w-full max-w-md pt-16 mx-auto h-full">
        <h4 className="text-xl font-bold text-gray-900 md:text-xl pb-6">
          Completion Example
        </h4>
        <div className="h-full w-full">
          {data && (
            <pre className="p-4 text-sm bg-gray-100">
              {JSON.stringify(data, null, 2)}
            </pre>
          )}
          {error && (
            <div className="fixed top-0 left-0 w-full p-4 text-center bg-red-500 text-white">
              {error.message}
            </div>
          )}
          {completion}
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
    </div>
  );
}
