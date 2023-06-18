"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Spinner";

const ApprovedLoanCard = ({
  user_email,
  full_name,
  amount,
  location,
  phone_no,
  created_at,
  approved_by,
  approved_on,
  user_id,
  reload,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const confirmLoan = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({
          status: "repaid",
          repayment_confirmed_by: user_email,
        })
        .eq("user_id", user_id)
        .select();
      if (error) {
        toast(error.message, {
          duration: 4000,
          position: "top-center",
          icon: "🤷",
          style: {
            color: "white",
            background: "red",
          },
        });
      }
      if (data) {
        await supabase
          .from("profiles")
          .update({
            status: "inactive",
          })
          .eq("id", user_id);

        toast("Repayment confirmed", {
          duration: 4000,
          position: "top-center",
          icon: "👍",
          style: {
            color: "white",
            background: "green",
          },
        });
        // router.refresh();
        reload();
      }
    } catch (error) {
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className='border p-4 rounded-lg shadow-sm hover:shadow-md bg-green-50'>
        <h1 className='text-lg truncate'>{full_name}</h1>
        <div className='text-sm text-gray-500 leading-5'>
          <p>Amount: {amount}</p>
          <p>Phone no: {phone_no}</p>
          <p>Applied on: {dayjs(created_at).format(" MMM D, YYYY")}</p>
          <p>Approved on: {dayjs(approved_on).format(" MMM D, YYYY")}</p>
          <p>Approved by: {approved_by}</p>
        </div>
        <div className='mt-4'>
          <button
            onClick={confirmLoan}
            className='w-full rounded-full text-white bg-blue-950 py-3'>
            {loading ? (
              <div className='flex items-center justify-center gap-4'>
                <Spinner /> Confirming...
              </div>
            ) : (
              "Confirm loan repayment"
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default ApprovedLoanCard;
