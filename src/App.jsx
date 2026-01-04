import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";


import BasicLayout from "./layouts/BasicLayout";
import DashboardLayout from "./layouts/DashboardLayout";


import { UserRole } from "./types"; // JS এ UserRole = { Worker: 'Worker', ... } রাখবে
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "./constants";
// import NotificationPopup from "./components/NotificationPopup";
import { getNotifications, markNotificationAsRead } from "./services/notificationService";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // user object বা null
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    const userJson = localStorage.getItem(LOCAL_STORAGE_USER_KEY);

    if (token && userJson) {
      try {
        const user = JSON.parse(userJson);
        setIsLoggedIn(true);
        setCurrentUser(user);
        // logged in থাকলে notification load
        fetchNotifications(user.email);
      } catch (error) {
        console.error("Failed to parse user data from local storage", error);
        handleLogout();
      }
    } else {
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchNotifications = async (userEmail) => {
    const userNotifications = getNotifications(userEmail);
    setNotifications(userNotifications);
  };

  const handleLogin = (user, token) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

    setIsLoggedIn(true);
    setCurrentUser(user);
    fetchNotifications(user.email);

    navigate("/dashboard"); // login এর পর dashboard এ redirect
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);

    setIsLoggedIn(false);
    setCurrentUser(null);
    setNotifications([]);

    navigate("/"); // logout এর পর home এ redirect
  };

  const handleNotificationClick = (notificationId, actionRoute) => {
    markNotificationAsRead(notificationId);
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId));
    setShowNotifications(false);
    navigate(actionRoute);
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen flex flex-col">
      <Routes>
        {/* Public / Basic layout routes */}
        <Route
          path="/"
          element={
            <BasicLayout
              isLoggedIn={isLoggedIn}
              currentUser={currentUser}
              onLogout={handleLogout}
              onNotificationToggle={toggleNotifications}
              unreadNotificationCount={notifications.length}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage onLogin={handleLogin} />} />
          <Route
            path="register"
            element={<RegisterPage onRegister={handleLogin} />}
          />
          {/* আরও public route এখানে যোগ করতে পারো */}
        </Route>

        {/* Dashboard layout routes (logged-in এর জন্য) */}
        {isLoggedIn && currentUser && (
          <Route
            path="/dashboard/*"
            element={
              <DashboardLayout
                currentUser={currentUser}
                onLogout={handleLogout}
                onNotificationToggle={toggleNotifications}
                unreadNotificationCount={notifications.length}
              />
            }
          >
            {/* Worker routes */}
            {currentUser.role === UserRole.Worker && (
              <>
                <Route index element={<div>Worker Home</div>} />
                <Route path="task-list" element={<div>Worker Task List</div>} />
                <Route
                  path="my-submissions"
                  element={<div>Worker My Submissions</div>}
                />
                <Route
                  path="withdrawals"
                  element={<div>Worker Withdrawals</div>}
                />
              </>
            )}

            {/* Buyer routes */}
            {currentUser.role === UserRole.Buyer && (
              <>
                <Route index element={<div>Buyer Home</div>} />
                <Route
                  path="add-new-tasks"
                  element={<div>Buyer Add New Tasks</div>}
                />
                <Route
                  path="my-tasks"
                  element={<div>Buyer My Tasks</div>}
                />
                <Route
                  path="purchase-coin"
                  element={<div>Buyer Purchase Coin</div>}
                />
                <Route
                  path="payment-history"
                  element={<div>Buyer Payment History</div>}
                />
              </>
            )}

            {/* Admin routes */}
            {currentUser.role === UserRole.Admin && (
              <>
                <Route index element={<div>Admin Home</div>} />
                <Route
                  path="manage-users"
                  element={<div>Admin Manage Users</div>}
                />
                <Route
                  path="manage-tasks"
                  element={<div>Admin Manage Tasks</div>}
                />
              </>
            )}

            {/* Logged-in user unauthorized / not found */}
            <Route
              path="*"
              element={
                <div className="p-4 text-center text-red-500">
                  Unauthorized Access or Page Not Found!
                </div>
              }
            />
          </Route>
        )}

        {/* Not logged in → dashboard এ গেলে login দেখাবে */}
        <Route
          path="/dashboard/*"
          element={<LoginPage onLogin={handleLogin} />}
        />

        {/* Global 404 */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen text-xl text-gray-700">
              404 - Page Not Found
            </div>
          }
        />
      </Routes>

      {showNotifications && currentUser && (
        <NotificationPopup
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onNotificationClick={handleNotificationClick}
        />
      )}
    </div>
  );
}

export default App;