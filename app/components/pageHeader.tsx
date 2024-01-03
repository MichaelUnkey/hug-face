"use client"

import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function PageHeader() {
  const pathname = usePathname();
  return (
    <div>
      <header className="flex space-x-6 p-8 w-1/2 mx-auto border border-gray-300 rounded-xl shadow-lg">
        <SignedIn>
          {/* Mount the UserButton component */}
          <UserButton
            appearance={{ elements: { userButtonAvatarBox: "w-20 h-20" } }}
          />
          <h1 className="text-4xl pt-5 w-full text-slate-700">
            AI Hugger Chat
          </h1>

          <div className="w-full text-slate-900">
            <ul className="flex flex-row space-x-12 text-2xl align-middle h-full">
              <Link
                href="/completion"
                className={cn("flex flex-col h-full justify-center p-4", {
                  "text-blue-700 font-semibold": pathname === "/completion",
                  "": pathname !== "/completion",
                })}
              >
                <li>AI Completion</li>
              </Link>
              <Link
                href="/"
                className={cn("flex flex-col h-full justify-center p-4", {
                  "text-blue-700 font-semibold": pathname === "/",
                  "": pathname !== "/",
                })}
              >
                <li>AI Chat</li>
              </Link>
              <Link
                href="https://www.unkey.dev" target="_blank"
                className="flex flex-col h-full justify-center p-4 font-semibold"
              >
                <li>Unkey</li>
              </Link>
            </ul>
          </div>
        </SignedIn>
        <SignedOut>
          {/* Signed out users get sign in button */}
          <SignInButton />
        </SignedOut>
      </header>
    </div>
  );
}
