"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BiMailSend } from "react-icons/bi";
import { MdCall } from "react-icons/md";
import { BsWhatsapp } from 'react-icons/bs'

const CallMailButt = () => {
  return (
    <div className='hidden sm:flex'>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button
          as='button'
          className='whitespace-nowrap text-[#ecbd25] hover:text-amber-600 bg-blue-900/40 hover:bg-blue-900 px-4 py-2 rounded-full'>
          CONTACT US
        </Menu.Button>

        <Transition
          as={Fragment}
          enter='transform transition duration-100 ease-in'
          enterFrom='transform scale-95 opacity-0'
          enterTo='transform scale-100 opacity-100'
          leave='transform transition duration-75 ease-out'
          leaveFrom='transform scale-100 opacity-100'
          leaveTo='transform scale-95 opacity-0'>
          <Menu.Items
            className='origin-top-right absolute bg-gray-50 dark:bg-gray-700 right-0 flex flex-col mt-2 rounded-lg w-56 overflow-hidden shadow-2xl ring-1 ring-black ring-opacity-5 focus:ontline-none'
            static>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-300" : " "
                  } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                  href='tel:+2348079551587'>
                  <MdCall className='text-[#ec6d25] text-xl' />
                  Call
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-300 " : " "
                  } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                  href='mailto:nfvcbcoop@gmail.com'>
                  <BiMailSend className='text-[#ec6d25] text-2xl' />
                  Email
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`${
                    active ? "bg-blue-300 " : " "
                  } font-semibold inline-flex items-center px-4 gap-x-3 text-lg py-4 `}
                  href='https://wa.me/2348079551587'>
                  <BsWhatsapp className='text-[#ec6d25] text-xl' />
                  WhatsApp
                </a>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default CallMailButt;
