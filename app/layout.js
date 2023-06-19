// 'use client'

import NavHeader from "@/components/NavHeader";
import { Figtree, Shantell_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const shantell = Shantell_Sans({ subsets: ["latin"], weights: 400 });
const figtree = Figtree({ subsets: ["latin"] });

export const metadata = {
  title: "COOP Advance",
  description: "The NFVCB Cooperative society loan advance app.",
};

export default async function RootLayout({ children }) {
  return (
    <html
      lang='en'
      className='light'
      style={{ colorScheme: "light" }} suppressHydrationWarning>
      
      <body className={shantell.className}>
        <Providers>
          <div className={figtree.className}>
            <NavHeader />
          </div>
          {children}
        </Providers>
      </body>
    </html>
  );
}
