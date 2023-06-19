"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Spinner from "../Spinner";

const VerifyUserCard = ({
  id,
  full_name,
  ippis_no,
  location,
  phone_no,
  setError,
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const verify = async () => {
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .update({ verify: "verified" })
        .eq("id", id)
        .select();

      if (error) {
        setError(error.message);
      }

      if (data) {
        router.refresh();
      }
    } catch (error) {
      setError(error.message);
      console.log("error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='border dark:border-gray-700 rounded-lg p-4 mb-4 shadow-md'>
      <h1 className='font-semibold text-lg text-blue-950 dark:text-blue-500'>{full_name}</h1>
      <div className='text-sm leading-1'>
        <p>IPPIS No: {ippis_no}</p>
        <p>Zone / Centre: {location}</p>
        <p>Phone No: {phone_no}</p>
      </div>

      <button
        onClick={verify}
        className='w-full bg-blue-950 dark:bg-blue-500 text-white mt-4 p-3 rounded-lg'>
        {loading ? (
          <div className='flex items-center justify-center space-x-2'>
            <Spinner />
            <p>Verifying...</p>
          </div>
        ) : (
          "Verify"
        )}
      </button>
    </div>
  );
};

export default VerifyUserCard;
