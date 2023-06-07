"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "./LogoutButton";

const DesktopMenu = ({ profile }) => {
  const router = useRouter();

  return (
    <div>
      {profile &&
        profile.map((item) => (
          <div className='space-x-2' key={item.id}>
            <button
              onClick={() => router.push("/")}
              className=' bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
              HOME
            </button>
            {item.isAdmin && (
              <button
                onClick={() => router.push("/admin")}
                className=' bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
                ADMIN
              </button>
            )}
            <button
              onClick={() => router.push("/repay")}
              className=' bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
              REPAY
            </button>
            <LogoutButton />
          </div>
        ))}
    </div>
  );
};

export default DesktopMenu;
