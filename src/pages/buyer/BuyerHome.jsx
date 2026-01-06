import { useEffect, useState } from "react";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BuyerHome({ currentUser }) {
  const [stats, setStats] = useState({
    totalTasks: 0,
    pendingWorkers: 0,
    totalPaid: 0,
  });
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!currentUser?.email) return;
    loadData();
  }, [currentUser?.email]);

  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [tasksRes, paymentsRes, subsRes] = await Promise.all([
        fetch(
          `${API_BASE}/api/tasks/my?buyerEmail=${encodeURIComponent(
            currentUser.email
          )}`
        ),
        fetch(
          `${API_BASE}/api/payments/my?buyerEmail=${encodeURIComponent(
            currentUser.email
          )}`
        ),
        fetch(
          `${API_BASE}/api/submissions/pending?buyerEmail=${encodeURIComponent(
            currentUser.email
          )}`
        ),
      ]);

      const tasksData = await tasksRes.json();
      const paymentsData = await paymentsRes.json();
      const subsData = await subsRes.json();

      // basic validation
      if (!tasksRes.ok) throw new Error(tasksData.message || "Failed tasks");
      if (!paymentsRes.ok)
        throw new Error(paymentsData.message || "Failed payments");
      if (!subsRes.ok) throw new Error(subsData.message || "Failed subs");

      const totalTasks = tasksData.length;
      const pendingWorkers = tasksData.reduce(
        (sum, t) => sum + (t.requiredWorkers || 0),
        0
      );
      const totalPaid = paymentsData.reduce(
        (sum, p) => sum + (p.amountDollars || 0),
        0
      );

      setStats({ totalTasks, pendingWorkers, totalPaid });
      setSubmissions(subsData);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to load buyer home data.");
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (submissionId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/submissions/${submissionId}/approve`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to approve submission");
        return;
      }

      setSubmissions((prev) => prev.filter((s) => s.id !== submissionId));

      await loadData();
    } catch (err) {
      console.error(err);
      alert("Error approving submission");
    }
  };

  const handleReject = async (submissionId) => {
    try {
      const res = await fetch(
        `${API_BASE}/api/submissions/${submissionId}/reject`,
        { method: "PATCH" }
      );
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to reject submission");
        return;
      }
      setSubmissions((prev) => prev.filter((s) => s.id !== submissionId));
      await loadData();
    } catch (err) {
      console.error(err);
      alert("Error rejecting submission");
    }
  };

  const handleReport = async (submission) => {
  const reason = prompt("Please provide a reason for reporting this submission:");
  if (!reason) return;

  try {
    const res = await fetch(`${API_BASE}/api/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        submissionId: submission.id,
        taskTitle: submission.taskTitle,
        reporterEmail: currentUser.email, // Buyer's email
        workerEmail: submission.workerEmail, // Worker's email (যাকে রিপোর্ট করা হচ্ছে)
        workerName: submission.workerName,
        reason,
      }),
    });

    if (res.ok) {
      alert("Report submitted successfully to Admin.");
    } else {
      alert("Failed to submit report.");
    }
  } catch (err) {
    console.error(err);
    alert("Network error.");
  }
};

  if (loading) {
    return <div className="p-4">Loading buyer dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Stats */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Total Tasks
          </h3>
          <p className="text-2xl font-bold">{stats.totalTasks}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Pending Workers (Required)
          </h3>
          <p className="text-2xl font-bold">{stats.pendingWorkers}</p>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h3 className="text-sm font-semibold text-base-content/70">
            Total Payment Paid ($)
          </h3>
          <p className="text-2xl font-bold">${stats.totalPaid}</p>
        </div>
      </section>

      {/* Task To Review */}
      <section className="card bg-base-100 shadow-md p-4">
        <h3 className="text-lg font-semibold mb-4">Tasks To Review</h3>
        {error && <p className="text-sm text-error mb-2">{error}</p>}
        {submissions.length === 0 ? (
          <p className="text-sm text-base-content/70">
            No pending submissions at the moment.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              <thead>
                <tr>
                  <th>Worker</th>
                  <th>Task</th>
                  <th>Payable Coins</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.workerName}</td>
                    <td>{s.taskTitle}</td>
                    <td>{s.payableAmount}</td>
                    <td className="space-x-2">
                      <button
                        className="btn btn-xs btn-outline"
                        onClick={() => setSelectedSubmission(s)}
                      >
                        View Submission
                      </button>
                      <button
                        className="btn btn-xs btn-success"
                        onClick={() => handleApprove(s.id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => handleReject(s.id)}
                      >
                        Reject
                      </button>
                      <button className="btn btn-xs btn-warning" onClick={() => handleReport(s)}>
    Report
  </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* simple modal */}
      {selectedSubmission && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="card bg-base-100 w-full max-w-md p-4 relative">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => setSelectedSubmission(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-semibold mb-2">Submission Detail</h3>
            <p className="text-sm mb-1">
              <strong>Worker:</strong> {selectedSubmission.workerName}
            </p>
            <p className="text-sm mb-1">
              <strong>Task:</strong> {selectedSubmission.taskTitle}
            </p>
            <p className="text-sm mb-3">
              <strong>Payable:</strong> {selectedSubmission.payableAmount} coins
            </p>
            <p className="text-sm whitespace-pre-wrap">
              {selectedSubmission.submissionDetails}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default BuyerHome;
