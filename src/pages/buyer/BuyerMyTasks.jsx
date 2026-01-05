import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BuyerMyTasks({ currentUser, onUserUpdate }) {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editTask, setEditTask] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;
    loadTasks();
  }, [currentUser?.email]);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await fetch(
        `${API_BASE}/api/tasks/my?buyerEmail=${encodeURIComponent(
          currentUser.email
        )}`
      );
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to load tasks.");
        setLoading(false);
        return;
      }

      // sort by completionDate descending
      const sorted = data.sort(
        (a, b) =>
          new Date(b.completionDate).getTime() -
          new Date(a.completionDate).getTime()
      );
      setTasks(sorted);
    } catch (err) {
      console.error(err);
      setError("Network error while loading tasks.");
    } finally {
      setLoading(false);
    }
  };

  const openEdit = (task) => {
    setEditTask({
      ...task,
      title: task.title || "",
      detail: task.detail || "",
      submissionInfo: task.submissionInfo || "",
    });
  };

  const handleEditChange = (field) => (e) => {
    setEditTask((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const saveEdit = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/tasks/${editTask._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: editTask.title,
          detail: editTask.detail,
          submissionInfo: editTask.submissionInfo,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to update task.");
        return;
      }
      setEditTask(null);
      await loadTasks();
    } catch (err) {
      console.error(err);
      alert("Network error while updating task.");
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/tasks/${taskId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete task.");
        return;
      }

      if (data.updatedBuyer) {
        onUserUpdate(data.updatedBuyer);
      }

      await loadTasks();
    } catch (err) {
      console.error(err);
      alert("Network error while deleting task.");
    }
  };

  if (loading) {
    return <div className="p-4">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">My Tasks</h2>
      {error && <p className="text-sm text-error">{error}</p>}

      {tasks.length === 0 ? (
        <p className="text-sm text-base-content/70">
          You have not created any tasks yet.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Workers</th>
                <th>Payable</th>
                <th>Completion Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((t) => (
                <tr key={t._id}>
                  <td>{t.title}</td>
                  <td>{t.requiredWorkers}</td>
                  <td>{t.payableAmount}</td>
                  <td>
                    {t.completionDate
                      ? new Date(t.completionDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="space-x-2">
                    <button
                      className="btn btn-xs btn-outline"
                      onClick={() => openEdit(t)}
                    >
                      Update
                    </button>
                    <button
                      className="btn btn-xs btn-error"
                      onClick={() => handleDelete(t._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editTask && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card bg-base-100 w-full max-w-md p-4 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setEditTask(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-3">Update Task</h3>

            <div className="space-y-3">
              <div>
                <label className="label">Title</label>
                <input
                  className="input input-bordered w-full"
                  value={editTask.title}
                  onChange={handleEditChange("title")}
                />
              </div>
              <div>
                <label className="label">Task Detail</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={editTask.detail}
                  onChange={handleEditChange("detail")}
                />
              </div>
              <div>
                <label className="label">Submission Info</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={editTask.submissionInfo}
                  onChange={handleEditChange("submissionInfo")}
                />
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setEditTask(null)}
              >
                Cancel
              </button>
              <button className="btn btn-primary btn-sm" onClick={saveEdit}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerMyTasks;
