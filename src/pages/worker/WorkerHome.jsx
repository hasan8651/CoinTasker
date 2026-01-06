// src/pages/worker/WorkerHome.jsx
import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function WorkerHome({ currentUser }) {
  const [stats, setStats] = useState({
    totalSubmissions: 0,
    pendingSubmissions: 0,
    totalEarning: 0,
  });
  const [approvedSubmissions, setApprovedSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;

    const loadData = async () => {
      try {
        setLoading(true);
        // Worker-এর সব submission আনছি
        const res = await fetch(
          `${API_BASE}/api/submissions/my?workerEmail=${encodeURIComponent(
            currentUser.email
          )}`
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load worker data");
        }

        const totalSubmissions = data.length;
        const pendingSubmissions = data.filter(
          (s) => s.status === "pending"
        ).length;
        
        // Earning = approved submission গুলোর payableAmount এর যোগফল
        const totalEarning = data
          .filter((s) => s.status === "approved")
          .reduce((sum, s) => sum + Number(s.payableAmount || 0), 0);

        const approved = data.filter((s) => s.status === "approved");

        setStats({ totalSubmissions, pendingSubmissions, totalEarning });
        setApprovedSubmissions(approved);
      } catch (err) {
        console.error(err);
        setError("Failed to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [currentUser?.email]);

  if (loading) return <div className="p-4">Loading worker dashboard...</div>;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Total Submission
          </h3>
          <p className="text-2xl font-bold">{stats.totalSubmissions}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Pending Submission
          </h3>
          <p className="text-2xl font-bold">{stats.pendingSubmissions}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Total Earning
          </h3>
          <p className="text-2xl font-bold">{stats.totalEarning}</p>
        </div>
      </section>

      {/* Approved Submissions Table */}
      <section className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Approved Submissions</h3>
        {error && <p className="text-sm text-error mb-2">{error}</p>}
        {approvedSubmissions.length === 0 ? (
          <p className="text-sm text-base-content/70">
            No approved submissions yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Task Title</th>
                  <th>Payable Amount</th>
                  <th>Buyer Name</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {approvedSubmissions.map((s) => (
                  <tr key={s._id || s.id}>
                    <td>{s.taskTitle}</td>
                    <td>{s.payableAmount}</td>
                    <td>{s.buyerName}</td>
                    <td>
                      <span className="badge badge-success badge-sm">
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default WorkerHome;