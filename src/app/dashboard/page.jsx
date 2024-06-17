import { signOut } from "@/auth";
import React from "react";

const DashboardPage = () => {
  return (
    <div>
      <h1>DashboardPage</h1>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default DashboardPage;
