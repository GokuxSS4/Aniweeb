import Link from "next/link";

import { CiSearch } from "react-icons/ci";

export default function NavBar() {
  return (
    <nav className="w-11/12 mx-auto bg-transparent h-16 flex items-center justify-around relative z-50">
      <h1 className="">Aniweeb.tv</h1>

      <div className="flex items-center gap-5">
        <Link
          href="#"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
        >
          Home
        </Link>
        <Link
          href="#"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
        >
          Trending
        </Link>
        <Link
          href="#"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
        >
          Popular
        </Link>
        <Link
          href="#"
          className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 hover:text-white"
        >
          Schedule
        </Link>
      </div>

      <div className="relative">
        <input
          type="text"
          placeholder="Search anime..."
          className="bg-slate-200 text-white pl-10 pr-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <CiSearch className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </nav>
  );
}
