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
import AdminHome from "./pages/admin/AdminHome";
import AdminManageUsers from "./pages/admin/AdminManageUsers";
import AdminManageTasks from "./pages/admin/AdminManageTasks";
import WorkerHome from "./pages/worker/WorkerHome";
import WorkerTaskList from "./pages/worker/WorkerTaskList";
import WorkerTaskDetails from "./pages/worker/WorkerTaskDetails";
import WorkerMySubmissions from "./pages/worker/WorkerMySubmissions";
import WorkerWithdrawals from "./pages/worker/WorkerWithdrawals";
import AdminReports from "./pages/admin/AdminReports";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

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

const fetchNotifications = async (userEmail) => {
  const res = await fetch(`${API_BASE}/api/notifications?email=${userEmail}`);
  const data = await res.json();
  setNotifications(data);
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
    <Route index element={<WorkerHome currentUser={currentUser} />} />
    <Route path="task-list" element={<WorkerTaskList />} />
    <Route path="task-details/:id" element={<WorkerTaskDetails currentUser={currentUser} />} />
    <Route path="my-submissions" element={<WorkerMySubmissions currentUser={currentUser} />} />
    <Route path="withdrawals" element={<WorkerWithdrawals currentUser={currentUser} />} />
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
          {role === "admin" && (
  <>
    <Route index element={<AdminHome />} />
    <Route path="manage-users" element={<AdminManageUsers />} />
    <Route path="manage-tasks" element={<AdminManageTasks />} />
    <Route path="reports" element={<AdminReports />} />
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
