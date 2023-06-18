'use client'

import { useState } from "react";
import LoanRequestCard from "./LoanRequestCard";

const LoanRequest = ({ loans, user_email }) => {

  return (
    <div className='mt-4 max-w-md mx-auto'>
      <h1 className='text-center font-semibold text-2xl mb-4'>Loan Requests</h1>
    
      {loans === null ||
        (loans.length <= 0 && (
          <p className='text-lg text-center py-8'>
            No loan application received at the moment.
          </p>
        ))}
      {loans &&
        loans.map((loan) => (
          <LoanRequestCard key={loan.id} {...loan} user_email={user_email} />
        ))}
    </div>
  );
};

export default LoanRequest;
