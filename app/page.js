import LoanApplication from "@/components/LoanApplication";
import ProfileUpdate from "@/components/ProfileUpdate";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });

  const { data } = await supabase.auth.getSession();
  if (!data.session) {
    // this is a protected route - only users who are signed in can view this route
    return redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", data.session?.user?.id);

  let userEmail = data.session?.user?.email;

  return (
    <main className='flex min-h-screen flex-col py-12 px-4'>
   
      <p className='text-center font-semibold text-4xl sm:text-5xl'>
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-green-500 via-yellow-500 to-pink-500'>
          COOP Advance
        </span>
      </p>

      <div>
        {!profile && "loading"}
        {profile &&
          profile.map((user) => (
            <div key={user.id}>
              {user.full_name === null ? (
                <ProfileUpdate {...user} email={userEmail} />
              ) : (
                <LoanApplication {...user} />
              )}
            </div>
          ))}
      </div>
    </main>
  );
}
