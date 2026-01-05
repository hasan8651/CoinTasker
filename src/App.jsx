import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router";
import BasicLayout from "./layouts/BasicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import HomePage from "./HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import {
  getNotifications,
  markNotificationAsRead,
} from "./services/notificationService";
import NotificationPopup from "./components/NotificationPopup";
import { UserRole } from "./types";
import {
  LOCAL_STORAGE_AUTH_TOKEN_KEY,
  LOCAL_STORAGE_USER_KEY,
} from "./constants";

import BuyerHome from "./pages/buyer/BuyerHome";
import BuyerAddTask from "./pages/buyer/BuyerAddTask";
import BuyerMyTasks from "./pages/buyer/BuyerMyTasks";
import BuyerPurchaseCoin from "./pages/buyer/BuyerPurchaseCoin";
import BuyerPaymentHistory from "./pages/buyer/BuyerPaymentHistory";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
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

  const fetchNotifications = (userEmail) => {
    const userNotifications = getNotifications(userEmail);
    setNotifications(userNotifications);
  };

  const handleLogin = (user, token) => {
    localStorage.setItem(LOCAL_STORAGE_AUTH_TOKEN_KEY, token);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(user));

    setIsLoggedIn(true);
    setCurrentUser(user);
    fetchNotifications(user.email);

    navigate("/dashboard");
  };

  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_AUTH_TOKEN_KEY);
    localStorage.removeItem(LOCAL_STORAGE_USER_KEY);

    setIsLoggedIn(false);
    setCurrentUser(null);
    setNotifications([]);

    navigate("/");
  };

  const handleUserUpdate = (updatedUser) => {
    setCurrentUser(updatedUser);
    localStorage.setItem(LOCAL_STORAGE_USER_KEY, JSON.stringify(updatedUser));
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

  const role = String(currentUser?.role || "").toLowerCase();

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
        </Route>

        {/* Dashboard layout routes */}
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
            {role === "worker" && (
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
            {role === "buyer" && (
              <>
                <Route
                  index
                  element={<BuyerHome currentUser={currentUser} />}
                />
                <Route
                  path="add-new-tasks"
                  element={
                    <BuyerAddTask
                      currentUser={currentUser}
                      onUserUpdate={handleUserUpdate}
                    />
                  }
                />
                <Route
                  path="my-tasks"
                  element={
                    <BuyerMyTasks
                      currentUser={currentUser}
                      onUserUpdate={handleUserUpdate}
                    />
                  }
                />
                <Route
                  path="purchase-coin"
                  element={
                    <BuyerPurchaseCoin
                      currentUser={currentUser}
                      onUserUpdate={handleUserUpdate}
                    />
                  }
                />
                <Route
                  path="payment-history"
                  element={<BuyerPaymentHistory currentUser={currentUser} />}
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

        {/* Not logged in → dashboard → login */}
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
