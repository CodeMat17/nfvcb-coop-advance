"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const DesktopMenu = ({ profile }) => {
  const router = useRouter();

  return (
    <div className='hidden sm:flex'>
      {profile &&
        profile.map((item) => (
          <div className='space-x-2' key={item.id}>
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
            <LogoutButton />
          </div>
        ))}
    </div>
  );
};

export default DesktopMenu;
