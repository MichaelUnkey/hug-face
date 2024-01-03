"use client"

import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function PageHeader() {
  const pathname = usePathname();
  return (
    <Card className="flex flex-row">
      <SignedIn>
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "w-20 h-20 m-8" } }}
        />
        <div className="flex flex-col w-full justify-center ">
          <h1 className="font-medium text-left text-4xl">AI With Unkey</h1>
        </div>
        <div className="flex w-full align-bottom justify-end">
          <ul className="flex pr-8 space-x-16">
            <Link
              href="/completion"
              className={cn("flex flex-col h-full justify-end p-4", {
                "font-semibold border-b-2 border-black":
                  pathname === "/completion",
                "": pathname !== "/completion",
              })}
            >
              <li>AI Completion</li>
            </Link>
            <Link
              href="/"
              className={cn("flex flex-col h-full justify-end p-4", {
                " font-semibold border-b-2 border-black": pathname === "/",
                "": pathname !== "/",
              })}
            >
              <li>AI Chat</li>
            </Link>
            <Link
              href="https://www.unkey.dev"
              target="_blank"
              className="flex flex-col h-full justify-end p-4 font-semibold"
            >
              <Button variant="default" className="px-6">
                Unkey
              </Button>
            </Link>
          </ul>
        </div>
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </Card>
  );
}
