"use client";

import { Menu, Transition } from "@headlessui/react";
import { AiOutlineLogout } from "react-icons/ai";
import { BiHomeSmile, BiMailSend } from "react-icons/bi";
import { GiPayMoney } from "react-icons/gi";
import { HiMenuAlt3 } from "react-icons/hi";
import { RiAdminLine } from "react-icons/ri";
import { MdCall } from 'react-icons/md'

const MobileMenu = ({ profile }) => {
  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button className='inline-flex justify-center shadow-lg bg-amber-600 p-2 rounded-lg'>
            <HiMenuAlt3 className='text-white hover:text-amber-400 text-3xl' />
          </Menu.Button>
          <Transition
            show={open}
            enter='transform transition duration-100 ease-in'
            enterFrom='transform scale-95 opacity-0'
            enterTo='transform scale-100 opacity-100'
            leave='transform transition duration-75 ease-out'
            leaveFrom='transform scale-100 opacity-100'
            leaveTo='transform scale-95 opacity-0'>
            <Menu.Items
              className='origin-top-right absolute bg-amber-500 right-0 flex flex-col mt-2 rounded-lg w-56 overflow-hidden shadow-2xl ring-1 ring-black ring-opacity-5 focus:ontline-none'
              static>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active ? "bg-amber-400 text-amber-900" : "text-white"
                    } font-semibold inline-flex items-center justify-center gap-x-3 text-center text-lg py-4 `}
                    href='/'>
                    <BiHomeSmile
                      className={` ${
                        active ? "text-amber-900" : "text-green-600"
                      } text-xl font-semibold `}
                    />
                    HOME
                  </a>
                )}
              </Menu.Item>
              {profile &&
                profile.map((item) => (
                  <div key='item.id'>
                    {item.isAdmin && (
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            className={`${
                              active
                                ? "bg-amber-400 text-amber-900"
                                : "text-white"
                            } font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center text-lg py-4 `}
                            href='/admin'>
                            <RiAdminLine
                              className={` ${
                                active ? "text-amber-900" : "text-green-600"
                              } text-xl font-semibold `}
                            />
                            ADMIN
                          </a>
                        )}
                      </Menu.Item>
                    )}
                  </div>
                ))}

              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active ? "bg-amber-400 text-amber-900" : "text-white"
                    } font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center text-lg py-4 `}
                    href='/repay'>
                    <GiPayMoney
                      className={` ${
                        active ? "text-amber-900" : "text-green-600"
                      } text-xl font-semibold `}
                    />
                    REPAY
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && "bg-red-300"
                    } font-semibold inline-flex items-center justify-center gap-x-3 text-red-500 text-center text-lg py-4 `}
                    href='/admin'>
                    <AiOutlineLogout className='text-xl font-semibold' />
                    SIGN OUT
                  </a>
                )}
              </Menu.Item>
              <div className='flex justify-center divide-x divide-gray-400'>
                <Menu.Item className='flex justify-center'>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? "bg-amber-400 text-amber-900" : "text-white"
                      } w-full font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center py-4 `}
                      href='/repay'>
                      <MdCall
                        className={` ${
                          active ? "text-amber-900" : "text-green-600"
                        } text-2xl font-semibold `}
                      />
                      {/* CALL US */}
                    </a>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <a
                      className={`${
                        active ? "bg-amber-400 text-amber-900" : "text-white"
                      } w-full font-semibold inline-flex items-center justify-center gap-x-3 text-amber-900 text-center py-4 `}
                      href='/repay'>
                      <BiMailSend
                        className={` ${
                          active ? "text-amber-900" : "text-green-600"
                        } text-2xl font-semibold `}
                      />
                      {/* EMAIL US */}
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default MobileMenu;
