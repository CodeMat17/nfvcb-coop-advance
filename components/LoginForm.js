"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

export const LoginForm = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [switchTab, setSwitchTab] = useState(true);

  const handleSignUp = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    });
    if (error) {
      setError(error.message);
    }
    if (data) {
      setSubmitted(true);
    }
    setLoading(false);
    router.refresh();
  };

  const handleSignIn = async () => {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    }
    if (data) {
      router.refresh();
      router.push("/");
    }
    setLoading(false);
  };

  if (submitted) {
    return (
      <div className='py-12 px-4 flex justify-center text-center'>
        Check your email box for your login link.
      </div>
    );
  }

  const switchLoginTab = () => {
    if (switchTab) {
      setSwitchTab(false);
    } else {
      setSwitchTab(true);
    }
  };

  return (
    <>
      <p className='text-center text-xl pt-4 pb-2'>
        {switchTab ? <span>Sign In</span> : <span>Sign Up</span>}
      </p>

      {error && (
        <div className='flex justify-center align-middle text-red-500 bg-red-100 rounded-lg py-4'>
          {error}
        </div>
      )}
      <div>
        <input
          name='email'
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder='Enter Email'
          className='border-2 rounded-full p-3 mt-1 w-full bg-gray-100 drop-shadow-sm'
        />

        <input
          type='password'
          name='password'
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder='Enter Password'
          className='border-2 rounded-full p-3 mt-4 w-full bg-gray-100 drop-shadow-sm'
        />

        <div>
          {switchTab ? (
            <button
              onClick={handleSignIn}
              className='w-full border-2 p-4 rounded-full mt-8 bg-gradient-to-r from-green-500 to-yellow-500 hover:via-green-500/90 hover:to-yellow-500/70 text-white'>
              {loading ? (
                <div className='flex items-center justify-center gap-x-3'>
                  <CgSpinnerAlt className=' text-2xl w-6 h-6 animate-spin' />{" "}
                  <p>Signing In...</p>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          ) : (
            <button
              onClick={handleSignUp}
              className='w-full border-2 p-4 rounded-full mt-8 bg-gradient-to-r from-green-500 to-yellow-500 hover:via-green-500/90 hover:to-yellow-500/70 text-white'>
              {loading ? (
                <div className='flex items-center justify-center gap-x-3'>
                  <CgSpinnerAlt className=' text-2xl w-6 h-6 animate-spin' />{" "}
                  <p>Signing Up...</p>
                </div>
              ) : (
                "Sign Up"
              )}
            </button>
          )}
        </div>
        {switchTab ? (
          <p className='text-center text-sm mt-4'>
            If you are new,{" "}
            <span
              className='cursor-pointer text-blue-500 border rounded-full py-0.5 px-1 shadow-md'
              onClick={switchLoginTab}>
              Sign up here
            </span>
          </p>
        ) : (
          <p className='text-center text-sm mt-4'>
            If you have signed up already,{" "}
            <span
              className='cursor-pointer  text-blue-500 border rounded-full py-0.5 px-1 shadow-md'
              onClick={switchLoginTab}>
              Sign in here
            </span>
          </p>
        )}
      </div>
    </>
  );
};
