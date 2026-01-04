// src/types.js

// Runtime "enum" for user roles
export const UserRole = {
  Worker: "Worker",
  Buyer: "Buyer",
  Admin: "Admin",
};

// যদি SubmissionStatus ইত্যাদি কোথাও ব্যবহার করো, সেগুলোও এভাবে রাখতে পারো:
export const SubmissionStatus = {
  Pending: "pending",
  Approved: "approved",
  Rejected: "rejected",
};