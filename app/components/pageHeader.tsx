import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import Link from "next/link";

export default function PageHeader() {
  return (
    <header className="flex space-x-6 p-8 w-1/2 mx-auto bg-slate-300">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton
          appearance={{ elements: { userButtonAvatarBox: "w-20 h-20" } }}
        />
        <h1 className="font-bold text-4xl pt-5 w-full">AI Hugger Chat</h1>
        <div className="w-full">
          <ul className="flex flex-row space-x-12 text-2xl justify-center pt-6">
            <Link href="/completion">
              <li>AI Completion</li>
            </Link>
            <Link href="/">
              <li>AI Chat</li>
            </Link>
            <Link href="https://www.unkey.dev">
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
  );
}
