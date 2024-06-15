import "@base/styles/globals.css";

import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "@base/trpc/react";

export const metadata = {
  title: "Cinema Ticket",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
