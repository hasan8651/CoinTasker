import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router";

function BasicLayout({
  isLoggedIn,
  currentUser,
  onLogout,
  onNotificationToggle,
  unreadNotificationCount,
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        isLoggedIn={isLoggedIn}
        currentUser={currentUser}
        onLogout={onLogout}
        onNotificationToggle={onNotificationToggle}
        unreadNotificationCount={unreadNotificationCount}
      />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default BasicLayout;