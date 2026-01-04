import { useState } from "react";
import { WEBSITE_NAME, GITHUB_REPO_URL } from "../constants";
import { Link } from "react-router";

function Navbar({
  isLoggedIn,
  currentUser,
  onLogout,
  onNotificationToggle,
  unreadNotificationCount,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const getDashboardHomePath = (role) => {
    // এখন সব রোলের জন্য একই: /dashboard
    // future এ চাইলে role অনুযায়ী আলাদা path দিতে পারো
    return "/dashboard";
  };

  return (
    <nav className="bg-indigo-700 p-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between flex-wrap">
        {/* Website Name / Logo */}
        <Link
          to="/"
          className="flex items-center text-white text-2xl font-bold"
        >
          <img
            src="https://picsum.photos/40/40"
            alt="Logo"
            className="h-8 w-8 mr-2 rounded-full"
          />
          {WEBSITE_NAME}
        </Link>

        {/* Mobile menu button */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="flex items-center px-3 py-2 border rounded text-indigo-200 border-indigo-400 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v15z" />
            </svg>
          </button>
        </div>

        {/* Desktop and mobile menu items */}
        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } w-full flex-grow lg:flex lg:items-center lg:w-auto`}
        >
          <div className="text-sm lg:flex-grow lg:flex lg:justify-end lg:items-center">
            {isLoggedIn && currentUser ? (
              <>
                <Link
                  to={getDashboardHomePath(currentUser.role)}
                  className="block mt-4 lg:inline-block lg:mt-0 text-indigo-200 hover:text-white mr-4 text-base font-medium"
                >
                  Dashboard
                </Link>

                <span className="block mt-4 lg:inline-block lg:mt-0 text-yellow-400 mr-4 text-base font-bold">
                  Coins: {currentUser.coins}
                </span>

                {/* Notifications */}
                <div className="relative inline-block text-left mr-4 mt-4 lg:mt-0">
                  <button
                    onClick={onNotificationToggle}
                    className="text-indigo-200 hover:text-white relative"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
                        {unreadNotificationCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* User avatar */}
                <div className="flex items-center mt-4 lg:mt-0 mr-4">
                  <img
                    src={
                      currentUser.photoUrl || "https://picsum.photos/50/50"
                    }
                    alt="User Profile"
                    className="w-8 h-8 rounded-full mr-2"
                  />
                  <span className="text-white text-base font-medium hidden md:inline">
                    {currentUser.name}
                  </span>
                </div>

                {/* Logout */}
                <button
                  onClick={onLogout}
                  className="block mt-4 lg:inline-block lg:mt-0 text-base px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-700 hover:bg-white transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block mt-4 lg:inline-block lg:mt-0 text-base text-indigo-200 hover:text-white mr-4 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block mt-4 lg:inline-block lg:mt-0 text-base text-indigo-200 hover:text-white mr-4 font-medium"
                >
                  Register
                </Link>
              </>
            )}

            {/* GitHub / Join as Developer */}
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-4 lg:inline-block lg:mt-0 text-base px-4 py-2 leading-none border rounded text-yellow-400 border-yellow-400 hover:border-transparent hover:text-indigo-700 hover:bg-yellow-400 transition-colors duration-300 ml-0 lg:ml-4"
            >
              Join as Developer
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;