// src/pages/admin/AdminManageTasks.jsx
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminManageTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadTasks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/admin/tasks`);
      const data = await res.json();
      if (res.ok) setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleDeleteTask = async (id) => {
    if (!confirm("Are you sure you want to delete this task?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/admin/tasks/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        alert("Task deleted successfully");
        loadTasks();
      } else {
        alert("Failed to delete task");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-4">Loading tasks...</div>;

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Buyer Name</th>
                <th>Workers Needed</th>
                <th>Payable</th>
                <th>Availability</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.buyerName}</td>
                  <td>{task.requiredWorkers}</td>
                  <td>{task.payableAmount}</td>
                  <td>
                    {task.requiredWorkers > 0 ? (
                      <span className="badge badge-success">Available</span>
                    ) : (
                      <span className="badge badge-warning">Full</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleDeleteTask(task._id)}
                    >
                      Delete Task
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminManageTasks;