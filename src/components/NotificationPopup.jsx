import { useEffect, useRef } from "react";

function NotificationPopup({ notifications, onClose, onNotificationClick }) {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

    const sortedNotifications = [...notifications].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return (
    <div
      ref={popupRef}
      className="
        fixed top-16 right-4 md:right-8 lg:right-16
        w-80 md:w-96 bg-white rounded-lg shadow-xl
        border border-gray-200 z-50
        max-h-[80vh] overflow-y-auto
        transform animate-slide-down
      "
    >
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-indigo-50">
        <h3 className="text-lg font-semibold text-gray-800">Notifications</h3>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {sortedNotifications.length === 0 ? (
        <p className="p-4 text-gray-500 text-center">No new notifications.</p>
      ) : (
        <ul>
          {sortedNotifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-4 border-b border-gray-100 cursor-pointer ${
                notification.read
                  ? "bg-gray-50 text-gray-500"
                  : "bg-white hover:bg-indigo-50"
              } transition-colors duration-200`}
              onClick={() =>
                onNotificationClick(notification.id, notification.actionRoute)
              }
            >
              <p
                className={`text-sm ${
                  notification.read
                    ? "text-gray-500"
                    : "text-gray-800 font-medium"
                }`}
              >
                {notification.message}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(notification.time).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NotificationPopup;