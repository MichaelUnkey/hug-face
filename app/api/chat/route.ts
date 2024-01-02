import { HfInference } from "@huggingface/inference";
import { HuggingFaceStream, StreamingTextResponse } from "ai";
import { experimental_buildOpenAssistantPrompt } from "ai/prompts";
import { verifyKey } from "@unkey/api";
import { NextResponse } from "next/server";
import { headers} from 'next/headers';

// Create a new HuggingFace Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const authHeader = headers().get("Authorization");
  if (!authHeader) {
    return new Response("Unauthorized", { status: 401 });
  }
  const key = authHeader.replace("Bearer ", "");
  const { result, error } = await verifyKey(key);
  if (error) {
    console.error(error);
    return new Response("Internal Server Error", { status: 500 });
  }
  if (!result.valid) {
    return new Response("Unauthorized", { status: 401 });
  }

  //check unkey
  const { messages } = await req.json();

  const response = Hf.textGenerationStream({
    model: "OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5",
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false,
    },
  });

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
