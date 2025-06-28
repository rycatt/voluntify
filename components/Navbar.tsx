"use client";

import { Calendar, ChartColumn, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="flex justify-between items-center px-12 py-6 space-x-8">
      <h1 className="text-2xl font-bold text-gray-900">Voluntify</h1>
      <div className="flex">
        <Link
          href="/"
          className={`flex justify-center items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            pathname === "/"
              ? "text-blue-600 bg-blue-200/70"
              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          } `}
        >
          <ChartColumn size={18} />
          <span className="font-medium text-sm">Dashboard</span>
        </Link>
        <Link
          href="/opportunities"
          className={`flex justify-center items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
            pathname === "/opportunities"
              ? "text-blue-600 bg-blue-200/70"
              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          }`}
        >
          <Calendar size={18} />
          <span>Opportunities</span>
        </Link>
      </div>
      <div className="flex items-center space-x-3 cursor-pointer hover:bg-gray-200/70 rounded-lg px-3 py-2 transition-colors">
        <div className="w-10 h-10 rounded-full p-1.5 flex justify-center items-center bg-slate-200">
          <User size={25} />
        </div>
        <div>
          <p className="font-semibold text-gray-900 text-sm">John Doe</p>
          <p className="text-gray-500 text-xs">9 hours logged</p>
        </div>
      </div>
    </div>
  );
};
