import React from 'react'

const CallMailButt = () => {
  return (
    <div className='hidden sm:flex'>
      <button
        // onClick={() => router.push("/repay")}
        className='text-[#ecbd25] hover:text-amber-600 bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
        CALL/MAIL
      </button>
    </div>
  );
}

export default CallMailButt