// 'use client'

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import NavHeader from "@/components/NavHeader";
import { Inter, Shantell_Sans } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
const shantell = Shantell_Sans({ subsets: ["latin"], weights: 400 });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  const supabase = createClientComponentClient();
  // const signUp = () => {
  //   supabase.auth.signUp({
  //     email: "gaboka3636@pgobo.com",
  //     password: "chukwumc",
  //   });
  // };

  // const signIn = () => {
  //   supabase.auth.signInWithPassword({
  //     email: "gaboka3636@pgobo.com",
  //     password: "chukwumc",
  //   });
  // };

  // const signOut = () => {
  //   supabase.auth.signOut();
  // };

  return (
    <html lang='en'>
      <body className={shantell.className}>
        {/* <button onClick={signOut}>Sign Out</button> */}
        <NavHeader />
        {children}
      </body>
    </html>
  );
}
