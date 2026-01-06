import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/reports`);
      const data = await res.json();
      if (res.ok) setReports(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleResolve = async (id) => {
    if (!confirm("Are you sure you want to resolve/delete this report?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/reports/${id}`, { method: "DELETE" });
      if (res.ok) {
        alert("Report resolved.");
        fetchReports();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Optional: User Ban logic (requires user update API)
  const handleBanUser = async (workerEmail) => {
    // এখানে /api/admin/users/:email/ban এ কল করতে পারো যদি বানাও
    alert(`Action needed: Please go to 'Manage Users' to ban ${workerEmail}`);
  };

  if (loading) return <div className="p-4">Loading reports...</div>;

  return (
    <div className="card bg-base-100 shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4">User Reports</h2>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Reporter (Buyer)</th>
                <th>Reported Worker</th>
                <th>Task Title</th>
                <th>Reason</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report._id}>
                  <td>{report.reporterEmail}</td>
                  <td>
                    <div className="font-bold">{report.workerName}</div>
                    <div className="text-xs opacity-50">{report.workerEmail}</div>
                  </td>
                  <td>{report.taskTitle}</td>
                  <td className="max-w-xs truncate" title={report.reason}>{report.reason}</td>
                  <td>{new Date(report.createdAt).toLocaleDateString()}</td>
                  <td className="space-x-2">
                    <button 
                      className="btn btn-xs btn-error"
                      onClick={() => handleBanUser(report.workerEmail)}
                    >
                      Punish
                    </button>
                    <button 
                      className="btn btn-xs btn-success"
                      onClick={() => handleResolve(report._id)}
                    >
                      Resolve
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

export default AdminReports;