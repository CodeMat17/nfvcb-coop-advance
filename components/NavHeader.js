import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { Inter } from "next/font/google";
import { cookies } from "next/headers";
import DesktopMenu from "./DesktopMenu";
import MobileMenu from "./MobileMenu";

const inter = Inter({ subsets: ["latin"] });

export default async function NavHeader() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const { data: profile } = await supabase
    .from("profiles")
    .select("id, isAdmin")
    .eq("id", data?.session?.user?.id);

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
            <div className='sm:hidden'>
              <MobileMenu profile={profile} />
            </div>
            <div className='hidden sm:flex'>
              <DesktopMenu profile={profile} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
