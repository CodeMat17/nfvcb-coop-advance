"use client";

import { Menu, Transition } from "@headlessui/react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiHomeSmile, BiMailSend } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { MdCall } from "react-icons/md";
import { RiAdminLine } from "react-icons/ri";

const MobileMenu = ({ profile, session }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const signOut = () => {
    supabase.auth.signOut();
    router.refresh()
  };

  return (
    <Menu as='div' className='relative inline-block text-left sm:hidden'>
      <div>
        <Menu.Button className='p-1 rounded-lg bg-[#086daf] hover:bg-blue-900 text-[#ec6d25]'>
          <HiMenuAlt3 className='text-3xl' aria-hidden='true' />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transform transition duration-100 ease-in'
        enterFrom='transform scale-95 opacity-0'
        enterTo='transform scale-100 opacity-100'
        leave='transform transition duration-75 ease-out'
        leaveFrom='transform scale-100 opacity-100'
        leaveTo='transform scale-95 opacity-0'>
        <Menu.Items
          className='origin-top-right absolute bg-blue-50 right-0 flex flex-col mt-2 rounded-lg w-56 overflow-hidden shadow-2xl ring-1 ring-black ring-opacity-5 focus:ontline-none'
          static>
          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-blue-200 text-white" : "text-[#ec6d25] "
                } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                href='/'>
                <BiHomeSmile
                  className={` ${
                    active ? "text-blue-950" : "text-blue-300"
                  } text-xl font-semibold `}
                />
                HOME
              </a>
            )}
          </Menu.Item>
          {session && (
            <>
              {profile &&
                profile.map((item) => (
                  <div key='item.id'>
                    {item.isAdmin && (
                      <Menu.Item className='w-full'>
                        {({ active }) => (
                          <a
                            className={`${
                              active
                                ? "bg-blue-200 text-white"
                                : "text-[#ec6d25] "
                            } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                            href='/admin'>
                            <RiAdminLine
                              className={` ${
                                active ? "text-blue-950" : "text-blue-300"
                              } text-xl font-semibold `}
                            />
                            ADMIN
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                ))}
            </>
          )}

          <Menu.Item>
            {({ active }) => (
              <a
                className={`${
                  active ? "bg-blue-200 text-white" : "text-[#ec6d25] "
                } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                href='/repay'>
                <GiPayMoney
                  className={` ${
                    active ? "text-blue-950" : "text-blue-300"
                  } text-xl font-semibold `}
                />
                REPAY
              </a>
            )}
          </Menu.Item>

          {session && (
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={signOut}
                  className={`${
                    active ? "bg-blue-200 text-red-500" : "text-[#ec6d25] "
                  } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}>
                  <AiOutlineLogout
                    className={` ${
                      active ? "text-red-500" : "text-blue-300"
                    } text-xl font-semibold `}
                  />
                  SIGN OUT
                </button>
              )}
            </Menu.Item>
          )}
          <div className='flex justify-center divide-x divide-gray-400 bg-blue-100'>
            <Menu.Item className='flex justify-center'>
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-200" : "text-white"
                  } w-full font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center py-4 `}
                  href='#'>
                  <MdCall
                    className={`  text-blue-950 text-2xl font-semibold `}
                  />
                </a>
              )}
            </Menu.Item>

            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-200" : "text-white"
                  } w-full font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center py-4 `}
                  href='#'>
                  <BiMailSend
                    className={`  text-blue-950 text-2xl font-semibold `}
                  />
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MobileMenu;
