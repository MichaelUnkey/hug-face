import "./globals.css";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import PageHeader from "./components/pageHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "AI Hugger Chat",
  description: "AI with Unkey application template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <PageHeader />
          <div className="h-full">{children}</div>
        </body>
      </html>
    </ClerkProvider>
  );
}
