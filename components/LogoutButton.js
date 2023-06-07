"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LogoutButton() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    setLoading(false);
    router.push("/login");
  };

  return (
    <button
      onClick={signOut}
      className='bg-red-500/30 text-red-500 hover:text-red-600 hover:bg-red-500/20 py-2 px-4 w- rounded-full'>
      {loading ? "Signing out" : "Sign Out"}
    </button>
  );
}
