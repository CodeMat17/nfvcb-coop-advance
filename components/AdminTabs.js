"use client";

import { Tab } from "@headlessui/react";
import { Fragment } from "react";
import LoanRequest from "./adminDashboard/LoanRequest";
import VerifyUser from "./adminDashboard/VerifyUser";
import ApprovedLoans from "./adminDashboard/ApprovedLoans";

const AdminTabs = ({ verify, loans, user_email, approvedLoans }) => {
  return (
    <div className='w-full my-8'>
      <Tab.Group>
        <Tab.List className='flex justify-center space-x-8 rounded-lg bg-gray-100 dark:bg-gray-700 p-2 text-sm font-semibold transition-transform duration-700 max-w-md mx-auto'>
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "bg-blue-950 dark:bg-blue-500 text-white px-4 py-2 rounded-full"
                    : "bg-white text-blue-950  px-4 py-2 rounded-full shadow-md"
                }>
                Verify
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "bg-blue-950 dark:bg-blue-500 text-white px-4 py-2 rounded-full"
                    : "bg-white text-blue-950  px-4 py-2 rounded-full shadow-md"
                }>
                Loans
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button
                className={
                  selected
                    ? "bg-blue-950 dark:bg-blue-500 text-white px-4 py-2 rounded-full"
                    : "bg-white text-blue-950 px-4 py-2 rounded-full shadow-md"
                }>
                Approved
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className='mt-2'>
          <Tab.Panel>
            <VerifyUser verify={verify} />
          </Tab.Panel>
          <Tab.Panel>
            <LoanRequest loans={loans} user_email={user_email} />
          </Tab.Panel>
          <Tab.Panel>
            <ApprovedLoans
              approvedLoans={approvedLoans}
              user_email={user_email}
            />
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default AdminTabs;
