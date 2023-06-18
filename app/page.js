import LoanApplication from "@/components/LoanApplication";
import ProfileUpdate from "@/components/ProfileUpdate";
import Spinner from "@/components/Spinner";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Image from "next/image";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    // this is a protected route - only users who are signed in can view this route
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user?.id);

  let userEmail = user?.email;

  return (
    <main className='flex min-h-screen flex-col py-12 px-4'>
      <p className='text-center font-semibold text-4xl sm:text-5xl'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500'>
          COOP Advance
        </span>
      </p>
      <div>
        {!profile && (
          <div className='flex justify-center py-12 gap-4 items-center'>
            <Spinner />
            <p className='text-xl'>No profile data to load.</p>
          </div>
        )}
        {profile &&
          profile.map((user) => (
            <div key={user.id}>
              {user.full_name === null ? (
                <ProfileUpdate {...user} email={userEmail} />
              ) : (
                  <>
                    
                  {user.verify === null && (
                    <div className='text-lg text-center max-w-sm mx-auto py-8'>
                      <div className='relative flex justify-center'>
                        <Image
                          alt=''
                          width={250}
                          height={250}
                          src='/welcome.svg'
                        />
                        <p className='absolute bottom-2 bg-[#a99edb] text-bold px-3 py-1 rounded-full opacity-90 animate-bounce'>
                          {user.full_name}
                        </p>
                      </div>
                      Your registration is completed. Kindly contact the admin
                      to confirm your membership.
                    </div>
                  )}

                  {user.verify === 'verified' && <LoanApplication {...user} />}
                </>
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
