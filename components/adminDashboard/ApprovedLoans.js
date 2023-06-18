"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Spinner from "../Spinner";
import ApprovedLoanCard from "./ApprovedLoanCard";

const ApprovedLoans = ({user_email }) => {
  const supabase = createClientComponentClient();

  const [loans, setLoans] = useState(null);

  useEffect(() => {
    approvedLoans();
  }, []);

  const approvedLoans = async () => {
    const { data } = await supabase
      .from("loans")
      .select()
      .order("created_at", { ascending: false })
      .eq("status", "approved")
      .range(0, 19);
    if (data) {
      setLoans(data);
    }
  };
 
  return (
    <div className='mt-4'>
      <h1 className='text-center font-semibold text-2xl mb-4'>
        Approved Loans
      </h1>

      {!loans === null && (
        <div className='flex items-center justify-center gap-4 py-12 bg-gray-100 rounded-lg max-w-sm mx-auto'>
          <Spinner />
          <p>fetching...</p>
        </div>
      )}

      {loans === null ||
        (loans.length <= 0 && (
          <p className='text-lg text-center py-8'>
            No approved loan at the moment.
          </p>
        ))}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 grid-flow-row gap-4'>
        {loans &&
          loans.map((loan) => (
            <ApprovedLoanCard
              key={loan.id}
              {...loan}
              user_email={user_email}
              reload={approvedLoans}
            />
          ))}
      </div>
    </div>
  );
};

export default ApprovedLoans;
