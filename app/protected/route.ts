import { withUnkey } from "@unkey/nextjs";
import { NextResponse } from "next/server";

export const POST = withUnkey(async (req) => {
  if (!req.unkey.valid) {
    return new NextResponse("unauthorized", { status: 403 });
  }

  // Process the request here
  // You have access to the verification response using `req.unkey`
  console.log(req.unkey);
  return new NextResponse("Your API key is valid!");
});
