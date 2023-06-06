"use client";

import { LoginForm } from "@/components/LoginForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        return router.push("/");
      }
      router.refresh();
    };

    getSession();
  }, [supabase.auth, router]);

  return (
    <div className='max-w-md mx-auto px-4 py-12'>
      <p className='text-center font-semibold text-4xl sm:text-5xl'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500'>
          COOP Advance
        </span>
      </p>

      <p className='text-center text-sm text-gray-500 mb-6'>
        This service is strictly for the registered members of the NFVCB
        Cooperative Society.
      </p>

      <div>
        <LoginForm />
      </div>
    </div>
  );
}
