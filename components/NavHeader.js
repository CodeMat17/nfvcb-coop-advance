import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Inter } from "next/font/google";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export default async function NavHeader() {
  const supabase = createServerComponentClient({cookies});
  const { data } = await supabase.auth.getSession();
  return (
    <div className='sticky top-0 z-50 px-4 py-3 bg-blue-950 text-white'>
      <div className='flex justify-between place-items-center'>
        <div className='relative bg-amber-600 w-[40px] h-[40px] rounded-sm'>
          <div className='absolute right-[-4.5px] bottom-[-4.5px] border-2 border-dashed border-amber-600 w-[30px] h-[30px] rounded-full bg-blue-950 p-2 animate-spin'></div>
          <p
            className={`absolute right-[-1px] bottom-[-1.5px] text-amber-600 font-semibold ${inter.className}`}>
            CA
          </p>
        </div>

        {data?.session?.user && (
          <div className='flex flex-row'>
            <div className='md:hidden'>
              <MobileMenu />
            </div>
            <div className='hidden md:flex'>
              <button className='mr-4'>Desktop Menu</button>
              <LogoutButton />
            </div>
          </div>
)}
      </div>
    </div>
  );
}
