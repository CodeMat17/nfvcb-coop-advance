"use client";

import { Menu, Transition } from "@headlessui/react";
import { HiMenuAlt3 } from "react-icons/hi";
import {AiOutlineLogout} from 'react-icons/ai'
import { GiPayMoney } from 'react-icons/gi'
import { RiAdminLine } from 'react-icons/ri'
import { BiHomeSmile } from 'react-icons/bi'

const MobileMenu = () => {
  return (
    <Menu as='div' className='relative'>
      {({ open }) => (
        <>
          <Menu.Button className='inline-flex justify-center border shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500 bg-amber-600 p-2 rounded-lg'>
            <HiMenuAlt3 className='text-amber-900 hover:text-amber-400 text-3xl' />
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
              className='origin-top-right absolute bg-amber-500 right-0 flex flex-col mt-2 rounded-lg w-56 overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:ontline-none'
              static>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active ? "bg-amber-400 text-amber-900" : "text-white"
                    } font-semibold inline-flex items-center justify-center gap-x-2 text-center text-lg py-4 `}
                    href='/'>
                    <BiHomeSmile className='text-xl' />
                    HOME
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active ? "bg-amber-400 text-amber-900" : "text-white"
                    } font-semibold inline-flex items-center justify-center gap-x-2 text-amber-900 text-center text-lg py-4 `}
                    href='/admin'>
                    <RiAdminLine className='text-xl font-semibold' />
                    ADMIN
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active ? "bg-amber-400 text-amber-900" : "text-white"
                    } font-semibold inline-flex items-center justify-center gap-x-2 text-amber-900 text-center text-lg py-4 `}
                    href='/repay'>
                    <GiPayMoney className='text-xl font-semibold' />
                    REPAY
                  </a>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <a
                    className={`${
                      active && "bg-red-300"
                    } font-semibold inline-flex items-center justify-center gap-x-2 text-red-500 text-center text-lg py-4 `}
                    href='/admin'>
                    <AiOutlineLogout className='text-xl font-semibold' />
                    SIGN OUT
                  </a>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default MobileMenu;
