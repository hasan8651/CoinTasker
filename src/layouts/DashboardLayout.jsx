import { useState } from "react";
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
 const coins = currentUser.coins ?? 0;
  const avatarUrl =
    currentUser.photoUrl || "https://picsum.photos/50/50?random=avatar";

  const roleLabel = String(currentUser.role);

  return (
    <div className="flex flex-col min-h-screen bg-base-200">
      {/* TOP HEADER */}
      <header className="bg-base-100 border-b border-base-300 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-3 space-y-2">
          {/* Row 1: Logo | Coins + Avatar */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-base-100 font-bold">
                CT
              </div>
              <span className="text-lg font-bold">{WEBSITE_NAME}</span>
            </Link>

            {/* Right: Coins + Avatar */}
            <div className="flex items-center gap-4">
              <span className="px-3 py-1 rounded-full bg-base-200 text-sm font-semibold text-warning">
                Coins: {coins}
              </span>
              <div className="flex items-center gap-2">
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={avatarUrl} alt={currentUser.name} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Role | Name   ||   Notification + Logout */}
          <div className="flex items-center justify-between gap-4">
            {/* Left: Role + Name */}
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-wide text-base-content/60">
                {roleLabel} Dashboard
              </span>
              <span className="text-sm font-semibold text-base-content">
                {currentUser.name} ({currentUser.email})
              </span>
            </div>

            {/* Right: Notification + Logout */}
            <div className="flex items-center gap-3">
              {/* Notification */}
              <button
                onClick={onNotificationToggle}
                className="relative btn btn-sm btn-ghost btn-circle"
                aria-label="Notifications"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
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
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-base-100 bg-error rounded-full">
                    {unreadNotificationCount}
                  </span>
                )}
              </button>

              {/* Logout */}
              <button
                onClick={onLogout}
                className="btn btn-sm btn-outline btn-error normal-case"
              >
                Logout
              </button>

              {/* Mobile sidebar toggle */}
              <button
                onClick={() => setIsSidebarOpen((prev) => !prev)}
                className="btn btn-ghost btn-circle lg:hidden"
                aria-label="Toggle sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16m0 6H10"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="flex flex-1">
        {/* SIDEBAR NAVIGATION */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-30
            w-64 bg-base-100 border-r border-base-300
            transform transition-transform duration-300 ease-in-out
            ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            lg:relative lg:translate-x-0
          `}
        >
          <div className="h-full flex flex-col">
            {/* Close button for mobile */}
            <div className="flex items-center justify-between px-4 py-3 lg:hidden border-b border-base-300">
              <span className="font-semibold text-sm">Navigation</span>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="btn btn-ghost btn-circle btn-xs"
                aria-label="Close sidebar"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
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
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-4 py-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      onClick={() => setIsSidebarOpen(false)}
                      className="block px-3 py-2 rounded-md text-sm text-base-content/80 hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Join as Dev in sidebar bottom */}
            <div className="px-4 py-3 border-t border-base-300">
              <a
                href={GITHUB_REPO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-sm btn-outline btn-primary w-full normal-case"
              >
                Join as Developer
              </a>
            </div>
          </div>
        </aside>

        {/* MAIN DASHBOARD SECTIONS (ROUTES) */}
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>

      {/* FOOTER */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;