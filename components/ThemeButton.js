"use client";

import { useTheme } from "next-themes";
import { BiSun } from "react-icons/bi";
import { HiMoon } from "react-icons/hi";
import { useEffect, useState } from "react";

const ThemeButton = () => {
  const { resolvedTheme, setTheme } = useTheme();

 const [mounted, setMounted] = useState(false);
 useEffect(() => setMounted(true), []);

 if (!mounted) {
   return null;
 }
    
  return (
    <button
      aria-label='Toggle Dark Mode'
      type='button'
      className='flex items-center rounded-full p-2 transition-colors hover:bg-zinc-500 dark:hover:bg-zinc-700'
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}>
      {resolvedTheme === "dark" ? (
        <BiSun className='h-8 w-8 text-orange-300' />
      ) : (
        <HiMoon className='h-8 w-8 text-slate-300' />
      )}
    </button>
  );
};

export default ThemeButton;
