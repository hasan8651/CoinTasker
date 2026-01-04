import React, { useState } from "react";
import { UserRole } from "../types";
import { WEBSITE_NAME, GITHUB_REPO_URL } from "../constants";
import Footer from "../components/Footer";
import { Link, Outlet } from "react-router";

function DashboardLayout({
  currentUser,
  onLogout,
  onNotificationToggle,
  unreadNotificationCount,
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavigationLinks = (role) => {
    switch (role) {
      case UserRole.Worker:
        return [
          { name: "Home", path: "/dashboard" },
          { name: "Task List", path: "/dashboard/task-list" },
          { name: "My Submissions", path: "/dashboard/my-submissions" },
          { name: "Withdrawals", path: "/dashboard/withdrawals" },
        ];
      case UserRole.Buyer:
        return [
          { name: "Home", path: "/dashboard" },
          { name: "Add New Tasks", path: "/dashboard/add-new-tasks" },
          { name: "My Tasks", path: "/dashboard/my-tasks" },
          { name: "Purchase Coin", path: "/dashboard/purchase-coin" },
          { name: "Payment History", path: "/dashboard/payment-history" },
        ];
      case UserRole.Admin:
        return [
          { name: "Home", path: "/dashboard" },
          { name: "Manage Users", path: "/dashboard/manage-users" },
          { name: "Manage Tasks", path: "/dashboard/manage-tasks" },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavigationLinks(currentUser.role);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Top Navbar */}
      <nav className="bg-indigo-700 p-4 shadow-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center">
            {/* Mobile Sidebar Toggle */}
            <button
              onClick={() => setIsSidebarOpen((prev) => !prev)}
              className="text-white lg:hidden mr-4"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>

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
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-yellow-400 text-lg font-bold hidden md:inline">
              Coins: {currentUser.coins}
            </span>

            {/* Notifications */}
            <div className="relative inline-block text-left">
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

            {/* User info */}
            <div className="flex items-center">
              <img
                src={currentUser.photoUrl || "https://picsum.photos/50/50"}
                alt="User Profile"
                className="w-8 h-8 rounded-full mr-2"
              />
              <div className="hidden md:flex flex-col text-sm">
                <span className="text-white font-medium">
                  {currentUser.name}
                </span>
                <span className="text-indigo-200 text-xs capitalize">
                  {String(currentUser.role).toLowerCase()}
                </span>
              </div>
            </div>

            {/* Logout */}
            <button
              onClick={onLogout}
              className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600 transition-colors duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="flex-grow flex">
        {/* Sidebar Navigation */}
        <aside
          className={`fixed inset-y-0 left-0 bg-gray-800 text-white w-64 p-4 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 flex flex-col`}
        >
          {/* Close button for mobile */}
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-4 right-4 text-white lg:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <div className="mb-8 mt-8 lg:mt-0 text-center">
            <p className="text-lg font-semibold capitalize">
              {currentUser.role} Dashboard
            </p>
            <p className="text-yellow-400 text-sm md:hidden">
              Coins: {currentUser.coins}
            </p>
          </div>

          <nav className="flex-grow">
            <ul>
              {navLinks.map((link) => (
                <li key={link.path} className="mb-2">
                  <Link
                    to={link.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="block p-3 rounded-md text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors duration-200 text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-700 text-center">
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-4 py-2 leading-none border rounded text-yellow-400 border-yellow-400 hover:border-transparent hover:text-gray-800 hover:bg-yellow-400 transition-colors duration-300 text-sm"
            >
              Join as Developer
            </a>
          </div>
        </aside>

        {/* Dashboard Content */}
        <main className="flex-grow p-4 lg:p-8">
          <Outlet />
        </main>
      </div>

      <Footer />
    </div>
  );
}

export default DashboardLayout;