"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Calendar, ChartColumn, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  const { registerUser } = useAuth();
  const hideNavbar =
    pathname === "/login" ||
    pathname === "/signup" ||
    pathname === "/forgot-password";

  if (hideNavbar) return null;

  // TODO: create a log out page
  return (
    <div className="grid grid-cols-3 items-center py-3">
      <div className="flex justify-start">
        <Link
          href="/"
          className="text-4xl font-bold  cursor-pointer text-blue-500"
        >
          Voluntify
        </Link>
      </div>
      <div className="flex items-center justify-center space-x-1">
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
      <div className="flex items-center justify-end space-x-3">
        <div className="w-12 h-12 rounded-full p-1.5 flex justify-center items-center cursor-pointer">
          {registerUser?.photoURL ? (
            <Image
              src={registerUser?.photoURL}
              alt="User Profile Picture"
              width={48}
              height={48}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-10 h-10 rounded-full p-1.5 flex justify-center items-center bg-slate-200">
              <User size={25} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
