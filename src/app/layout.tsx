import "@base/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { TRPCReactProvider } from "@base/trpc/react";
import { COMPANY_LOGO, COMPANY_NAME } from "../../constants/Company";
import Header from "@base/app/_components/Header";

export const metadata = {
  title: COMPANY_NAME,
  icons: [{ rel: "icon", url: COMPANY_LOGO || "/favicon.ico" }],
};

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
          <Header />
          {children}
        </TRPCReactProvider>
      </body>
    </html>
  );
}

export default RootLayout;
