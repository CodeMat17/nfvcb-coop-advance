"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { ImSpinner } from "react-icons/im";

export default function ProfileModal({ show, setShow, userEmail, userId }) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const [full_name, setFullname] = useState("");
  const [phone_no, setPhone_no] = useState("");
  const [ippis_no, setIPPIS_no] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const updateProfile = async () => {
    if (
      !full_name.trim() ||
      full_name.length < 6 ||
      !phone_no.trim() ||
      phone_no.length < 11 ||
      !ippis_no.trim() ||
      ippis_no.length < 6
    ) {
      toast.error("All fields are required. Read the red lines.");
    } else {
      try {
        setLoading(true);
        const { error } = await supabase
          .from("profiles")
          .update({ email: userEmail, full_name, ippis_no, phone_no })
          .eq("id", userId);

        if (error) {
          console.log("err msg", error.message);
          setError(error.message);
        } else {
          setShow(false);
          router.refresh();
          // router.reload(window.location.pathname);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        // router.replace(router.asPath);
      }
    }
  };

  return (
    <>
      <Toaster />
      {show && (
        <div className='fixed right-0 left-0 top-0 bottom-0 flex items-center justify-center py-10 px-4 bg-black bg-opacity-25 z-40'>
          <div className='relative bg-white rounded-lg z-50 w-full max-w-md mx-auto my-12 overflow-hidden'>
            <div className='group'>
              <div className='relative flex justify-between align-baseline bg-blue-950/50 px-4 pt-12 pb-2'>
                <p className='text-white font-semibold'>
                  Complete Your Registration
                </p>
                <button
                  onClick={() => setShow(false)}
                  className='group absolute top-0 right-0 mr-4 mt-4 bg-red-100 rounded-full p-0.5'>
                  <svg
                    className='w-8 h-8 text-red-500 group-hover:text-red-900'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth='1.5'
                    stroke='currentColor'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
                    />
                  </svg>
                </button>
              </div>
              <div className=' p-4 text-sm'>
                {error && (
                  <div className='text-center text-red-500 bg-red-100 rounded-lg p-2'>
                    {error}
                  </div>
                )}
                <div className='flex flex-col mb-2'>
                  <label>Email</label>
                  <input
                    readOnly
                    value={userEmail}
                    className='disabled:opacity-75 bg-gray-100 text-gray-500 cursor-not-allowed border-2 rounded-lg px-3 py-2 '
                  />
                </div>
                <div className='flex flex-col mb-2'>
                  <label>Name</label>
                  <input
                    minLength={6}
                    value={full_name}
                    onChange={(e) => setFullname(e.target.value)}
                    placeholder='Enter your name here'
                    className=' text-gray-700 border-2 rounded-lg px-3 py-2 '
                  />
                  <label className='text-red-500 text-xs'>
                    {full_name.length >= 6
                      ? ""
                      : "Name cannot be less than 6 characters."}
                  </label>
                </div>
                <div className='flex flex-col mb-2'>
                  <label>Phone No.</label>
                  <input
                    maxLength={11}
                    value={phone_no}
                    onChange={(e) => setPhone_no(e.target.value)}
                    placeholder='Enter your phone no. here'
                    className=' text-gray-700 border-2 rounded-lg px-3 py-2 '
                  />
                  <label className='text-red-500 text-xs'>
                    {phone_no.length === 11
                      ? ""
                      : "Phone no cannot be less than or more than 11 digits."}
                  </label>
                </div>
                <div className='flex flex-col mb-2'>
                  <label>IPPIS No.</label>
                  <input
                    maxLength={6}
                    value={ippis_no}
                    onChange={(e) => setIPPIS_no(e.target.value)}
                    placeholder='Enter your IPPIS no. here'
                    className=' text-gray-700 border-2 rounded-lg px-3 py-2 '
                  />
                  <label className='text-xs text-red-400 mt-0.5'>
                    {ippis_no.length < 6 ? 'Maximum of 6 digits' : ''}
                  </label>
                </div>
              </div>
              <div className='bg-gray-100 p-4 flex justify-between'>
                <button
                  onClick={() => setShow(false)}
                  className='text-md border-2 border-red-200 rounded-lg text-red-600 px-4 py-1 '>
                  Cancel
                </button>
                <button
                  onClick={updateProfile}
                  className={` text-md bg-blue-500/70 text-white rounded-lg px-4 py-1 `}>
                  {loading ? (
                    <div className='flex space-x-2'>
                      <div className='animate-spin w-6 h-6'>
                        <ImSpinner className='w-6 h-6' />
                      </div>
                      <p>Submitting</p>
                    </div>
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={() => setShow(false)}
              className='absolute top-0 right-0 bg-red-100 text-red-500 rounded-full px-2.5 mr-2 mt-2'></button>
          </div>
        </div>
      )}
    </>
  );
}
