import AdminTabs from "@/components/AdminTabs";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const revalidate = 0;

const Page = async () => {
  const supabase = createClientComponentClient();
  const serverClientSupabase = createServerComponentClient({ cookies });

  const {
    data: { user },
  } = await serverClientSupabase.auth.getUser();
  const user_email = user?.email;

  if (!user) {
    redirect("/login");
  }

  const { data: userProfile } = await serverClientSupabase
    .from("profiles")
    .select("id, isAdmin, full_name")
    .eq("id", user?.id);

  const { data: verify } = await serverClientSupabase
    .from("profiles")
    .select("*")
    .is("verify", null)
    .order("created_at", { ascending: false });

  const { data: loans } = await serverClientSupabase
    .from("loans")
    .select("id, user_id, full_name, location, ippis_no, phone_no, amount")
    .order("created_at", { ascending: false })
    .eq("status", "processing");

  const { data: approvedLoans } = await supabase
    .from("loans")
    .select()
    .order("created_at", { ascending: false })
    .eq("status", "approved")
    .range(0, 19);

  return (
    <div className='w-full max-w-6xl mx-auto px-4 py-12'>
      <div className='text-center'>
        <p className='text-xl'>COOP Advance </p>
        <p className='text-3xl '>Admin Dashboard </p>
      </div>

      {userProfile &&
        userProfile.map((user) => (
          <div key={user.id}>
            {!user.isAdmin && (
              <p className='text-center py-12 text-lg max-w-sm mx-auto'>
                {user.full_name}, you do not have the permissions to view this
                page.
              </p>
            )}
            {user.isAdmin && (
              <div>
                <AdminTabs
                  verify={verify}
                  loans={loans}
                  approvedLoans={approvedLoans}
                  user_email={user_email}
                />
              </div>
            )}
          </div>
        ))}
    </div>
  );
};

export default Page;
