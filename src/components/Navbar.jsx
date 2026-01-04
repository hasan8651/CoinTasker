// src/components/Navbar.jsx
import { useState } from "react";
import { WEBSITE_NAME, GITHUB_REPO_URL } from "../constants";
import { Link, NavLink } from "react-router";

function Navbar({ isLoggedIn, currentUser, onLogout }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleMobile = () => setMobileOpen((prev) => !prev);
  const closeMobile = () => setMobileOpen(false);

  const availableCoins = currentUser?.coins ?? 0;
  const avatarUrl =
    currentUser?.photoUrl || "https://picsum.photos/40/40?random=user";
  const avatarName =
    currentUser?.name || currentUser?.email || "User";

  const navLinkClass =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-base-200";
  const activeNavLinkClass = "bg-base-200 text-primary";

  return (
    <nav className="navbar bg-base-100 border-b border-base-300 sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Left: Logo + name */}
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="flex items-center gap-2 hover:opacity-90 transition"
          >
            {/* Logo image চাইলে এখানে নিজের লোগো replace করবে */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-base-100 font-bold">
              CT
            </div>
            <span className="text-lg md:text-xl font-bold">
              {WEBSITE_NAME}
            </span>
          </Link>
        </div>

        {/* Desktop nav (right side) */}
        <div className="hidden md:flex items-center gap-4">
          {!isLoggedIn && (
            <>
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeNavLinkClass : ""}`
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeNavLinkClass : ""}`
                }
              >
                Register
              </NavLink>
            </>
          )}

          {isLoggedIn && currentUser && (
            <>
              <NavLink
                to="/dashboard"
                className={({ isActive }) =>
                  `${navLinkClass} ${isActive ? activeNavLinkClass : ""}`
                }
              >
                Dashboard
              </NavLink>

              <span className="px-3 py-2 rounded-md text-sm font-semibold bg-base-200 text-warning">
                Coins: {availableCoins}
              </span>

              <div className="flex items-center gap-2">
                {/* Avatar + name */}
                <div className="avatar">
                  <div className="w-9 h-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                    <img src={avatarUrl} alt={avatarName} />
                  </div>
                </div>
                <span className="hidden lg:inline text-sm font-medium">
                  {avatarName}
                </span>
                <button
                  onClick={onLogout}
                  className="btn btn-sm btn-outline btn-error ml-1"
                >
                  Logout
                </button>
              </div>
            </>
          )}

          {/* Join as Developer – always visible */}
          <a
            href={GITHUB_REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-primary normal-case"
          >
            Join as Developer
          </a>
        </div>

        {/* Mobile: hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobile}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle navigation"
          >
            {mobileOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-base-300 bg-base-100">
          <div className="px-4 pt-2 pb-3 space-y-1">
            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  onClick={closeMobile}
                  className={navLinkClass}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={closeMobile}
                  className={navLinkClass}
                >
                  Register
                </Link>
              </>
            )}

            {isLoggedIn && currentUser && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMobile}
                  className={navLinkClass}
                >
                  Dashboard
                </Link>
                <div className="flex items-center justify-between px-3 py-2">
                  <span className="text-sm font-semibold text-warning">
                    Coins: {availableCoins}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2">
                  <div className="avatar">
                    <div className="w-8 h-8 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img src={avatarUrl} alt={avatarName} />
                    </div>
                  </div>
                  <span className="text-sm font-medium">{avatarName}</span>
                </div>
                <button
                  onClick={() => {
                    closeMobile();
                    onLogout();
                  }}
                  className="btn btn-sm btn-outline btn-error w-full mt-1"
                >
                  Logout
                </button>
              </>
            )}

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={closeMobile}
              className="btn btn-sm btn-primary w-full normal-case mt-2"
            >
              Join as Developer
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;