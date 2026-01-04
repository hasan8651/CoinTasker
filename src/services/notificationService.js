// src/services/notificationService.js

// For demo purposes, notifications are stored in localStorage or a simple array.
// In a real application, this would interact with a backend API.

const NOTIFICATIONS_STORAGE_KEY = "microtasker_notifications";

const getStoredNotifications = () => {
  const stored = localStorage.getItem(NOTIFICATIONS_STORAGE_KEY);
  return stored
    ? JSON.parse(stored).map((n) => ({ ...n, time: new Date(n.time) }))
    : [];
};

const saveNotifications = (notifications) => {
  localStorage.setItem(NOTIFICATIONS_STORAGE_KEY, JSON.stringify(notifications));
};

export const getNotifications = (userEmail) => {
  const allNotifications = getStoredNotifications();
  // Filter for unread notifications for the current user
  return allNotifications.filter(
    (n) => n.toEmail === userEmail && !n.read
  );
};

export const addNotification = (newNotification) => {
  // newNotification: { message, toEmail, actionRoute }
  const allNotifications = getStoredNotifications();
  const notification = {
    id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    ...newNotification,
    time: new Date(),
    read: false,
  };
  allNotifications.push(notification);
  saveNotifications(allNotifications);
};

export const markNotificationAsRead = (notificationId) => {
  const allNotifications = getStoredNotifications();
  const updatedNotifications = allNotifications.map((n) =>
    n.id === notificationId ? { ...n, read: true } : n
  );
  saveNotifications(updatedNotifications);
};

// Example of how to add a dummy notification (can be called from other parts of the app for demo)
export const addDummyNotification = (userEmail, message, actionRoute) => {
  addNotification({
    message,
    toEmail: userEmail,
    actionRoute,
  });
};