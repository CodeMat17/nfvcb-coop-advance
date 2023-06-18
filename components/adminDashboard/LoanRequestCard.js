"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "../Spinner";

const LoanRequestCard = ({
  user_id,
  ippis_no,
  full_name,
  amount,
  location,
  phone_no,
  user_email,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [declining, setDeclining] = useState(false);
  const [approving, setApproving] = useState(false);

  const declineLoan = async () => {
  
    setDeclining(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({ status: "declined" })
        .eq("user_id", user_id)
        .select();

      if (error) {
        toast(error.message, {
          duration: 4000,
          position: "top-center",
          icon: "😲",
          style: {
            color: "white",
            background: "red",
          },
        });
      }

      if (data) {
        toast("Loan Declined", {
          duration: 4000,
          position: "top-center",
          icon: "👍",
          style: {
            color: "white",
            background: "blue",
          },
        });
        router.refresh();
      }
    } catch (error) {
        toast(error.message, {
          duration: 4000,
          position: "top-center",
          icon: "😲",
          style: {
            color: "white",
            background: "red",
          },
        });
      console.log("error: ", error);
    } finally {
      setDeclining(false);
    }
  };

  const approveLoan = async () => {
   
    setApproving(true);
    try {
      const { data, error } = await supabase
        .from("loans")
        .update({
          status: "approved",
          approved_by: user_email,
          approved_on: new Date(),
        })
        .eq("user_id", user_id)
        .select();

      if (error) {
        toast(error.message, {
          duration: 4000,
          position: "top-center",
          icon: "😲",
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
            status: "approved",
          })
          .eq("id", user_id)
          .select();
        toast("Loan Approved", {
          duration: 4000,
          position: "top-center",
          icon: "👍",
          style: {
            color: "white",
            background: "green",
          },
        });
        router.refresh();
      }
    } catch (error) {
       toast(error.message, {
         duration: 4000,
         position: "top-center",
         icon: "😲",
         style: {
           color: "white",
           background: "red",
         },
       });
      console.log("error: ", error);
    } finally {
      setApproving(false);
    }
  };

  return (
    <div className='border rounded-lg p-4 mb-4 shadow-md'>
      <Toaster />
      <h1 className='font-semibold text-lg text-blue-950 truncate'>
        {full_name}
      </h1>
      <h1 className='font-semibold text-blue-950'>Amount:{amount}</h1>
      <div className='text-sm leading-1'>
        <p>IPPIS No: {ippis_no}</p>
        <p>Zone / Centre: {location}</p>
        <p>Phone No: {phone_no}</p>
      </div>

      <div className='flex flex-col sm:flex-row justify-between sm:space-x-6 items-center'>
        <button
          onClick={declineLoan}
          className='w-full bg-red-100 text-red-600 mt-4 p-3 rounded-full'>
          {declining ? (
            <div className='flex items-center justify-center space-x-2'>
              <Spinner />
              <p>Declining...</p>
            </div>
          ) : (
            "Decline"
          )}
        </button>

        <button
          onClick={approveLoan}
          className='w-full bg-blue-950 text-white mt-4 p-3 rounded-full'>
          {approving ? (
            <div className='flex items-center justify-center space-x-2'>
              <Spinner />
              <p>Approving...</p>
            </div>
          ) : (
            "Approve"
          )}
        </button>
      </div>
    </div>
  );
};

export default LoanRequestCard;
