import { useState } from "react";
import VerifyUserCard from "./VerifyUserCard";

const VerifyUser = ({ verify }) => {
  const [error, setError] = useState(null);

  return (
    <div className='mt-4  max-w-md mx-auto'>
      <h1 className='text-center font-semibold text-2xl mb-4'>Verify Users</h1>
      {error && (
        <p className='text-red-500 bg-red-100 p-2 rounded-lg text-center text-sm mb-4'>
          {error}
        </p>
      )}
      {verify === null ||
        (verify.length <= 0 && (
          <p className='text-lg text-center py-8'>
            No user to verify at the moment.
          </p>
        ))}
      {verify &&
        verify.map((item) => (
          <VerifyUserCard key={item.id} {...item} setError={setError} />
        ))}
    </div>
  );
};

export default VerifyUser