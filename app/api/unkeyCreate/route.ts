import { Unkey } from "@unkey/api";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const rootKey = process.env.UNKEY_ROOT_KEY;
  const apiId = process.env.UNKEY_API_ID;
  const { userId } = auth();

  if (!rootKey) {
    return new Response("Error reading key");
  }
  if (!apiId) {
    return new Response("Error reading key");
  }
  if (!userId) {
    return new Response("No user found");
  }
  
  const unkey = new Unkey({ rootKey });
  const created = await unkey.keys.create({
    apiId: apiId,
    prefix: "hugs",
    byteLength: 16,
    ownerId: userId,
    meta: {
      message: "AI Powered using HuggingFace",
    },
    
    ratelimit: {
      type: "fast",
      limit: 10,
      refillRate: 1,
      refillInterval: 1000,
    },
    remaining: 1000,
  });

if(created.result){
 return NextResponse.json(created.result);
}
 
}
