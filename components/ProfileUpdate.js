"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ProfileModal from "./ProfileModal";

const ProfileUpdate = ({ id, email }) => {
  const supabase = createClientComponentClient();
  const [show, setShow] = useState(false);

  return (
    <div className='flex flex-col item-center justify-center'>
      <ProfileModal
        show={show}
        setShow={setShow}
        userEmail={email}
        userId={id}
      />

      {!show && (
        <div className='max-w-md mx-auto py-12'>
          <button
            onClick={() => setShow(true)}
            className=' bg-blue-500/70 rounded-lg px-12 py-3'>
            Complete your registration
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileUpdate;
