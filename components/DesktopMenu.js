"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";
import CallMailButt from "./CallMailButt";

const DesktopMenu = ({ profile }) => {
  const router = useRouter();

  return (
    <div className='hidden sm:flex'>
      {profile &&
        profile.map((item) => (
          <div className='space-x-1 sm:space-x-2 flex' key={item.id}>
            <button
              onClick={() => router.push("/")}
              className='text-[#ecbd25] hover:text-amber-600 bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
              HOME
            </button>
            {item.isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className='text-[#ecbd25] hover:text-amber-600 bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
                ADMIN
              </button>
            )}
            <button
              onClick={() => router.push("/repay")}
              className='text-[#ecbd25] hover:text-amber-600 bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
              REPAY
            </button>
            <CallMailButt />
            <LogoutButton />
          </div>
        ))}
    </div>
  );
};

export default DesktopMenu;
