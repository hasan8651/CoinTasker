// src/pages/admin/AdminManageUsers.jsx
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users`);
      const data = await res.json();
      if (res.ok) setUsers(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRemoveUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("User deleted successfully");
        loadUsers();
      } else {
        alert("Failed to delete user");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleRoleUpdate = async (id, newRole) => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/users/${id}/role`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      if (res.ok) {
        alert(`User role updated to ${newRole}`);
        loadUsers();
      } else {
        alert("Failed to update role");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading users...</div>;

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Name</th>
              <th>Email</th>
              <th>Coins</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img src={user.photoUrl} alt={user.name} />
                    </div>
                  </div>
                </td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.coins}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={user.role}
                    onChange={(e) => handleRoleUpdate(user._id, e.target.value)}
                  >
                    <option value="Worker">Worker</option>
                    <option value="Buyer">Buyer</option>
                    <option value="Admin">Admin</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-error"
                    onClick={() => handleRemoveUser(user._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminManageUsers;