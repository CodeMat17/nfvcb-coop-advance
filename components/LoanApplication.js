"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import dayjs from "dayjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Spinner from "./Spinner";

const LoanApplication = ({ id, full_name, phone_no, ippis_no, status }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [noAmount, setNoAmount] = useState(false);
  const [loanData, setLoanData] = useState(null);

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleCheckbox = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const getLoanData = async () => {
      const { data } = await supabase
        .from("loans")
        .select("user_id, amount, approved_on")
        .eq("user_id", id);
      setLoanData(data);
    };
    getLoanData();
  }, [supabase, id]);

  const loanRequest = async () => {
    setNoAmount(false);
    if (amount === "") {
      setNoAmount(true);
    } else {
      try {
        setLoading(true);
        const { error } = await supabase.from("loans").upsert({
          user_id: id,
          amount,
          full_name,
        });
        if (!error) {
          await supabase
            .from("profiles")
            .update({ status: "processing" })
            .eq("id", id);

          toast("Your request has been received!", {
            duration: 4000,
            position: "top-center",
            icon: "👍",
            style: {
              color: "white",
              background: "blue",
            },
          });
        }
      } catch (error) {
        toast.error(error);
      } finally {
        setLoading(false);
        router.refresh();
      }
    }
  };

  return (
    <div className='w-full py-8'>
      <Toaster />
      {status === "inactive" && (
        <div className='max-w-md mx-auto'>
          <p className='text-center text-xl text-bold'>Apply For Loan</p>
          <div className='flex flex-col mt-2'>
            <label>Name:</label>
            <input
              readOnly
              value={full_name}
              className='disabled cursor-not-allowed bg-gray-100 text-gray-500 px-3 py-2 rounded-lg'
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label>Phone No:</label>
            <input
              readOnly
              value={phone_no}
              className='disabled cursor-not-allowed bg-gray-100 text-gray-500 px-3 py-2 rounded-lg'
            />
          </div>
          <div className='flex flex-col mt-2'>
            <label>IPPIS No:</label>
            <input
              readOnly
              value={ippis_no}
              className='disabled cursor-not-allowed bg-gray-100 text-gray-500 px-3 py-2 rounded-lg'
            />
          </div>
          <div className='mt-2'>
            <label>Amount:</label>
            <select
              id='amount'
              value={amount}
              onChange={handleAmount}
              className='w-full border-2 rounded-lg px-3 py-2 text-sm focus:ring-blue-500 focus:border-blue-500 block'>
              <option value=''>Select amount</option>
              <option value='₦5,000'>₦5,000</option>
              <option value='₦10,000'>₦10,000</option>
              <option value='₦15,000'>₦15,000</option>
              <option value='₦20,000'>₦20,000</option>
              <option value='₦25,000'>₦25,000</option>
              <option value='₦30,000'>₦30,000</option>
              <option value='₦35,000'>₦35,000</option>
              <option value='₦40,000'>₦40,000</option>
              <option value='₦45,000'>₦45,000</option>
              <option value='₦50,000'>₦50,000</option>
            </select>
          </div>
          <div className='py-4 text-sm text-red-500'>
            <p className='font-semibold'>Terms and conditions</p>
            <ul>
              <li className='mb-1'>
                *{" "}
                <span className='text-gray-500'>
                  5% of loan amount will be deducted from source as commission.
                </span>{" "}
              </li>
              <li>
                *{" "}
                <span className='text-gray-500'>
                  Loan payback duration is 3 mount starting from the date of
                  approval.
                </span>{" "}
              </li>
            </ul>
            <div className='mt-2'>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={handleCheckbox}
              />
              <label className='text-black'>
                {" "}
                I accept the terms and conditions.
              </label>
            </div>
          </div>
          {noAmount && (
            <p className='text-center text-sm text-red-500 bg-red-100 p-2 rounded-lg'>
              😕 Select a recognisable amount.
            </p>
          )}
          <div className={"my-6 text-white "}>
            <button
              onClick={loanRequest}
              disabled={!isChecked}
              className={`${
                !isChecked ? "opacity-25 cursor-not-allowed" : ""
              } bg-blue-700 hover:bg-blue-700 w-full rounded-full py-3`}>
              {loading ? (
                <div className='flex justify-center items-center gap-x-3'>
                  <Spinner />
                  <p>Submitting</p>
                </div>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </div>
      )}
      {status === "processing" && (
        <div className='max-w-md mx-auto'>
          <div className='border p-6 rounded-lg drop-shadow-lg'>
            <p className='py-2 text-center font-semibold text-xl'>Good news!</p>
            <p className='text-center'>
              {full_name}, your loan request has been received and is being
              processed at the moment. So, sit back and check later for the
              decision of the executives.
            </p>
            <p className='text-center text-4xl pt-6'>✌️</p>
          </div>
        </div>
      )}
      {status === "approved" && (
        <div className='max-w-md mx-auto'>
          <div className='overflow-hidden border rounded-lg drop-shadow-lg'>
            <div className='p-6'>
              <p className='py-2 text-center font-semibold text-2xl'>
                🤩 Hurray!
              </p>
              <p className='text-center'>
                {full_name}, your loan request has been approved.
              </p>
            </div>
            {loanData &&
              loanData.map((loan) => (
                <div key={loan.user_id} className='bg-blue-900 p-6 text-white'>
                  <p>Amount: {loan.amount}</p>
                  <p>
                    Approved on:{" "}
                    {dayjs(loan.approved_on).format(" MMM D, YYYY")}
                  </p>
                  {/* <Text>
                    Requested On: {dayjs(created_at).format(" MMM D, YYYY")}
                  </Text> */}

                  <p>
                    Repayment duration: 3 months{" "}
                    <span className='text-sm text-blue-300 '>
                      (from date of approval).
                    </span>{" "}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LoanApplication;
